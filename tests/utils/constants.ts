export const API_URL = 'http://127.0.0.1:3001';

// Auth
export const USER_REGISTER_SUCCESS = 'User registered successfully';
export const LOGIN_SUCCESS = 'Login successful';
export const USER_EXIST = 'User already exists';
export const INVALID_EMAIL = 'Invalid email format';
export const EMAIL_PASS_REQUIRED = 'Email and password are required';
export const PASS_SHORT = 'Password must be at least 8 characters';
export const PASS_LONG = 'Password must be 32 characters at most';
export const INVALID_CREDENTIALS = 'Invalid credentials';

// Bike
export const BIKE_CREATE_SUCCESS = 'Bike created successfully';
export const BIKE_UPDATE_SUCCESS = 'Bike updated successfully';
export const BIKE_DELETE_SUCCESS = 'Bike deleted successfully';
export const INVALID_YEAR = 'Year must be an integer between 1900 and 2100';
export const ODO_ERROR = 'Odometer must be a non-negative integer';
export const ODO_CANNOT_DECREASE = 'Odometer cannot decrease';

// Maintenance
export const MAINTENANCE_CREATE_SUCCESS = 'Maintenance created successfully';
export const MAINTENANCE_SCHEDULE_SUCCESS =
  'Maintenance scheduled successfully';
export const ODO_NEGATIVE_ERROR = 'odo must be a non-negative integer';
export const INTERVAL_DAYS_REQUIRED = 'interval_days is required';
export const INTERVAL_KM_REQUIRED = 'interval_km is required';
