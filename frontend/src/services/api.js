import axios from 'axios';

const API_BASE_URL = 'http://localhost:5261/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intern API calls
export const getInternById = async (id) => {
  try {
    const response = await api.get(`/interns/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching intern details';
  }
};

export const getAllInterns = async () => {
  try {
    const response = await api.get('/interns');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching interns';
  }
};

// Project API calls
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching project details';
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching projects';
  }
};

// Evaluation API calls
export const filterEvaluations = async (filters) => {
  try {
    const params = new URLSearchParams();
    if (filters.minScore) params.append('minScore', filters.minScore);
    if (filters.maxScore) params.append('maxScore', filters.maxScore);
    if (filters.evaluator) params.append('evaluator', filters.evaluator);
    if (filters.techStack) params.append('techStack', filters.techStack);
    
    const response = await api.get(`/evaluations/filter?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error filtering evaluations';
  }
};

export const getAllEvaluations = async () => {
  try {
    const response = await api.get('/evaluations');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching evaluations';
  }
};

export default api;
