interface ApiError {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}

interface ApiErrorType2{
  error: string;
  status: string;
}

export function normalizeError(err: ApiError|ApiErrorType2 | Error | string) {

  console.warn("ER👀", err);
  
  if(err?.status=="FETCH_ERROR"){
    return {
      message: "Network error. Please check your connection.",
      status: 503,
    };
  }

  if (!err) {
    return {
      message: "Unknown error",
      status: 500,
    };
  }

  if (
    typeof err === "object" &&
    "response" in err &&
    err.response?.status
  ) {
    return {
      message:
        err.response?.data?.message || "Server error",
      status: err.response?.status,
    };
  }

  if (err instanceof Error) {
    return {
      message: err.message,
      status: 400,
    };
  }

  if (typeof err === "string") {
    return {
      message: err,
      status: 400,
    };
  }

  return {
    message: "Unexpected error",
    status: 500,
  };
}