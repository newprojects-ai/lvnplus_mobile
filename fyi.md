# Development Journey Log

This file tracks the development journey of the lvnplus_mobile app, documenting what changes were made, why they were made, when they occurred, and how they were implemented.

## Change Log

Format:
```
### [Date & Time] Change Title
**What:** Description of what was changed
**Why:** Reason for the change
**How:** Technical details of how the change was implemented
```

---
### [1970-01-01 00:00:00] Initial Documentation Setup
**What:** Created fyi.md to track development journey
**Why:** To maintain a clear record of all changes and development decisions
**How:** Created new markdown file with structured format for logging changes

### [1970-01-01 00:00:00] Authentication Setup - Initial Structure
**What:** Set up basic authentication structure and utilities
**Why:** Prepare the foundation for implementing authentication features
**How:** 
- Created types for authentication state and user data
- Added validation utilities for email and password
- Added secure storage dependencies for token management
- Set up basic folder structure for authentication features

### [1970-01-01 00:00:01] Authentication API Integration
**What:** Added API service and updated auth types
**Why:** To integrate with the provided authentication endpoints
**How:** 
- Updated auth types to match API contract
- Created base API service with error handling
- Implemented auth service with register, login, and logout endpoints
- Added proper typing for API responses

### [1970-01-01 00:00:02] Authentication UI Implementation
**What:** Created login and registration screens with UI components
**Why:** To provide user interface for authentication
**How:** 
- Created reusable UI components (Button, Input)
- Implemented LoginScreen with form validation
- Implemented RegisterScreen with form validation
- Added proper error handling and loading states

### [1970-01-01 00:00:03] Navigation Setup
**What:** Added navigation between authentication screens
**Why:** To enable users to switch between login and registration screens
**How:** 
- Added React Navigation dependencies
- Created AuthNavigator with stack navigation
- Implemented navigation types for type safety
- Updated Login and Register screens with navigation logic

### [1970-01-01 00:00:04] Redux State Management Implementation
**What:** Added Redux Toolkit for centralized state management
**Why:** To provide a scalable, type-safe state management solution
**How:** 
- Installed Redux Toolkit and React Redux
- Created auth slice with async thunks for authentication actions
- Implemented typed hooks for Redux usage
- Integrated Redux with existing components
- Removed AuthContext in favor of Redux
- Added proper error handling and loading states in Redux store

### [2024-12-30 17:46:08] Android Build Error Investigation
**What:** Investigating and fixing Android build error related to react-native-screens
**Why:** Build is failing due to CMake configuration issues with ReactAndroid package
**How:** 
- Identified error in react-native-screens CMake configuration
- Error indicates missing ReactAndroid package configuration files
- Investigating NDK and CMake configuration issues

### [2024-12-30 17:56:05] Android Build Memory Optimization
**What:** Addressing Java Runtime Environment memory issues during Android build
**Why:** Build failing due to insufficient memory for metaspace and heap
**How:** 
- Adjusted JVM memory settings in gradle.properties
- Modified build configurations to reduce memory usage
- Investigating Java heap and metaspace settings

### [2024-12-30 17:59:32] Fixed Hooks Module Resolution
**What:** Fixed module resolution error for hooks in RootNavigator
**Why:** App failed to start due to missing hooks module exports
**How:** 
- Created index.ts in src/hooks directory
- Added proper exports for useAppDispatch and useAppSelector hooks
- This enables proper module resolution when importing from '../hooks'

### [2024-12-30 18:02:07] Fixed Variable Naming Conflict
**What:** Fixed duplicate loading variable declaration in RegisterScreen
**Why:** App failed to start due to naming conflict between Redux state and local state
**How:** 
- Renamed Redux loading state to `authLoading`
- Renamed local loading state to `isSubmitting`
- Updated button loading prop to use both states: `loading={isSubmitting || authLoading}`
- Added proper loading state management in try/catch block

### [2024-12-30 18:05:36] Improved Error Handling in Auth Flow
**What:** Fixed error rendering issue in LoginScreen and improved error handling
**Why:** App crashed when trying to render Error object directly in Text component
**How:** 
- Updated error handling in auth slice to properly convert errors to strings
- Added fallback error messages for login and registration failures
- Improved error state management in Redux store
- Added proper error handling for auth check rejection

### [2024-12-30 18:08:59] Added API Configuration
**What:** Added API configuration and improved error handling in services
**Why:** Missing API_BASE_URL constant and inconsistent error handling
**How:** 
- Created `src/config/env.ts` for environment configuration
- Centralized API_BASE_URL configuration
- Added proper error handling in auth service
- Fixed handleResponse export in api service
- Improved error messages for auth operations

### [2024-12-30 18:11:12] Improved API Service Architecture
**What:** Fixed API service initialization and headers management
**Why:** App crashed due to undefined headers in API service
**How:** 
- Refactored API service to use a proper class-based architecture
- Added private _headers field with proper initialization
- Added getter for headers to ensure immutability
- Improved setAuthToken method to properly manage Authorization header
- Added Accept header for better API compatibility

### [2024-12-30 18:17:00] Fixed Network Configuration for Android Emulator
**What:** Updated API configuration to work with Android emulator and added request logging
**Why:** Network requests were failing due to incorrect localhost URL in Android emulator
**How:** 
- Updated API_BASE_URL to use `10.0.2.2` for Android emulator
- Added platform-specific URL handling in environment configuration
- Added comprehensive request logging in auth service for debugging
- Added error logging for all API operations
- Added try/catch blocks around all async operations

**Resolution:**
- Successfully fixed build by:
  1. Reducing JVM heap size to 512m
  2. Setting MaxMetaspaceSize to 256m
  3. Adding heap ratio controls (MinHeapFreeRatio=10, MaxHeapFreeRatio=20)
  4. Removing deprecated Gradle options
  5. Running Gradle with --no-daemon flag