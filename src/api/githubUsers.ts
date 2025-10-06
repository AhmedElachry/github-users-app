const GITHUB_API = "https://api.github.com/users";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubError {
  message: string;
  documentation_url?: string;
}

function getFriendlyErrorMessage(status: number, defaultMsg: string): string {
  switch (status) {
    case 401:
      return "Invalid or missing GitHub token. Please check your .env settings.";
    case 403:
      return "API rate limit exceeded (60 requests/hour without a token). Try again later or add a token.";
    case 404:
      return "User not found.";
    case 500:
      return "GitHub server error. Please try again later.";
    default:
      return defaultMsg;
  }
}

async function fetchWithHandling<T>(url: string, token?: string): Promise<T> {
  try {
    const headers: HeadersInit = {};
    const authToken = token || import.meta.env.VITE_GITHUB_TOKEN;

    if (authToken) {
      headers["Authorization"] = `token ${authToken}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      let errorMessage = getFriendlyErrorMessage(
        res.status,
        `GitHub API error: ${res.status}`
      );

      try {
        const errorData: GitHubError = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // ignore
      }

      throw new Error(errorMessage);
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error) {
      console.error("API Error:", err.message);
      throw err;
    }
    throw new Error("Unknown API error");
  }
}

export async function fetchUsers(
  since: number,
  perPage: number,
  token?: string
): Promise<GitHubUser[]> {
  return fetchWithHandling<GitHubUser[]>(
    `${GITHUB_API}?since=${since}&per_page=${perPage}`,
    token
  );
}
