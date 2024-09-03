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
    console.log("content from file: ", response.data);
    return {
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (e: any) {
    console.log(e.status, e.response.data);
    return {
      status: e.status,
      error: e.response.data,
      data: "",
    };
  }
}
