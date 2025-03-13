import axios from "axios";
import type {
	Dog,
	Location,
	LocationSearchParams,
	LocationSearchResponse,
	LoginCredentials,
	Match,
	SearchResponse,
} from "./types";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export const login = async (credentials: LoginCredentials) => {
	const res = await api.post("/auth/login", credentials);
};

export const logout = async () => {
	await api.post("/auth/logout");
};

export const getBreeds = async (): Promise<string[]> => {
	const { data } = await api.get("/dogs/breeds");
	return data;
};

export const searchDogs = async (params: {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: string;
	sort?: string;
}): Promise<SearchResponse> => {
	const { data } = await api.get("/dogs/search", { params });
	return data;
};

export const getDogs = async (dogIds: string[]): Promise<Dog[]> => {
	const { data } = await api.post("/dogs", dogIds);
	return data;
};

export const matchDog = async (dogIds: string[]): Promise<Match> => {
	const { data } = await api.post("/dogs/match", dogIds);
	return data;
};

export const getLocations = async (zipCodes: string[]): Promise<Location[]> => {
	const { data } = await api.post("/locations", zipCodes);
	return data;
};

export const searchLocations = async (
	params: LocationSearchParams,
): Promise<LocationSearchResponse> => {
	const { data } = await api.post("/locations/search", params);
	return data;
};
