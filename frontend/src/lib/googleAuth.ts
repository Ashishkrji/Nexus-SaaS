// googleAuth.ts — Google Identity Services (GSI) integration

export interface GoogleAuthCallbacks {
  onSuccess: (user: any, token: string) => void;
  onError: (msg: string) => void;
}

/**
 * Loads the Google GSI script once, then initialises google.accounts.id
 * and triggers the One-Tap / popup flow.
 */
export function signInWithGoogle(callbacks: GoogleAuthCallbacks) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    callbacks.onError('Google Client ID is not configured. Add VITE_GOOGLE_CLIENT_ID to your .env file.');
    return;
  }

  // If GSI is already loaded, skip injection
  if ((window as any).google?.accounts?.id) {
    _initAndPrompt(clientId, callbacks);
    return;
  }

  // Dynamically load the GSI library
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => _initAndPrompt(clientId, callbacks);
  script.onerror = () => callbacks.onError('Failed to load Google Sign-In library.');
  document.head.appendChild(script);
}

function _initAndPrompt(clientId: string, callbacks: GoogleAuthCallbacks) {
  const google = (window as any).google;

  google.accounts.id.initialize({
    client_id: clientId,
    callback: async (response: { credential: string }) => {
      await _handleCredential(response.credential, callbacks);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });

  // Use the popup prompt (One Tap)
  google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      // Fallback: render a hidden button and click it
      _renderAndClickButton(clientId, callbacks);
    }
  });
}

function _renderAndClickButton(clientId: string, callbacks: GoogleAuthCallbacks) {
  const google = (window as any).google;
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;opacity:0;pointer-events:none;z-index:-1';
  document.body.appendChild(container);

  google.accounts.id.initialize({
    client_id: clientId,
    callback: async (response: { credential: string }) => {
      document.body.removeChild(container);
      await _handleCredential(response.credential, callbacks);
    },
    ux_mode: 'popup',
  });

  google.accounts.id.renderButton(container, {
    type: 'standard',
    size: 'large',
    theme: 'outline',
  });

  // Trigger the button click
  const btn = container.querySelector('div[role="button"]') as HTMLElement;
  btn?.click();
}

async function _handleCredential(credential: string, callbacks: GoogleAuthCallbacks) {
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    callbacks.onSuccess(data.user, data.token);
  } catch (err: any) {
    callbacks.onError(err.message);
  }
}

/**
 * Handles the redirect callback from Google OAuth if used.
 * Currently a placeholder to resolve import errors.
 */
export function handleGoogleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    localStorage.setItem('auth_token', token);
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

