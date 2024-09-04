"use server";
import axios from "axios";

interface FetchResponse {
  status: number;
  data: string;
  error: null | string;
}

export async function fetchCodeFile(gitURL: string): Promise<FetchResponse> {
  try {
    const url = new URL(gitURL);
    const [usernameAndRepo, branchAndPath] = url.pathname.split("/blob/");
    const response = await axios(
      `https://raw.githubusercontent.com/${usernameAndRepo}/${branchAndPath}`
    );
    return {
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (e: any) {
    return {
      status: e.status,
      error: e.response.data,
      data: "",
    };
  }
}
