// src/app/api/api.ts
import axios from 'axios';

const BASE_URL = 'https://vo-phase-1.7koncepts.com/api';

// Function to fetch store families
export const fetchStoreFamilies = async (token: string, page: number = 1, perPage: number = 10) => {
    const response = await axios.get(`${BASE_URL}/admin/store-families?page=${page}&per_page=${perPage}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Return the data
};

// Function to fetch parent stores
export const fetchParentStores = async (token: string) => {
    const response = await axios.get(`${BASE_URL}/admin/parent-stores-list`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Return the data
};