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

### [2024-12-30 18:25:57] Added Role Selector Component
**What:** Added role selection functionality to login screen
**Why:** Allow users to select their role during login instead of defaulting to 'student'
**How:** 
- Created new RoleSelector component with a segmented control UI
- Added role validation in login form
- Updated auth types to use proper Role type
- Added role selection UI to login screen
- Improved form layout and styling

### [2024-12-30 18:28:40] Updated Role Options
**What:** Updated role options in login screen to match requirements
**Why:** Need to support Student, Parent, and Tutor roles only
**How:** 
- Updated Role type to only include 'student', 'parent', and 'tutor'
- Changed RoleSelector UI label to "I am a" for better UX
- Added proper labels for each role option
- Set Student as the default role
- Removed unused roles (teacher, admin) from the system

### [2024-12-31 16:10:46] Gradle Wrapper Issue Resolution
**What:** Addressing Gradle wrapper class loading error during Android build
**Why:** Build failing with error "Could not find or load main class org.gradle.wrapper.GradleWrapperMain"
**How:** 
- Identified corrupted Gradle wrapper files in android/gradle/wrapper directory
- Found multiple versions of gradle-wrapper files including backup versions
- Attempting to fix by regenerating Gradle wrapper files

### [2024-12-31 16:12:45] Gradle Wrapper Resolution Progress
**What:** Attempting to fix Gradle wrapper issues
**Why:** Previous Gradle wrapper files were corrupted
**How:** 
- Successfully removed corrupted gradle-wrapper.jar and gradle-wrapper.properties
- Attempted to regenerate wrapper files using gradlew.bat wrapper command
- Need to try alternative approach: downloading wrapper files directly

### [2024-12-31 16:56:51] Gradle Build Performance Optimization
**What:** Modified Gradle settings to improve build performance
**Why:** Build process was hanging at "Evaluating Settings" stage
**How:** 
- Updated gradle.properties with optimized memory and build settings:
  - Increased JVM memory to 2048m and MetaspaceSize to 512m
  - Enabled Gradle daemon and parallel execution
  - Disabled on-demand configuration
  - Enabled build caching
- These changes should help prevent the build from hanging during settings evaluation

### [2024-12-31 16:57:53] JVM Heap Size Adjustment
**What:** Reduced JVM heap size in Gradle settings
**Why:** Previous setting of 2048m caused JVM initialization error: "Could not reserve enough space for 2097152KB object heap"
**How:** 
- Updated gradle.properties with lower memory settings:
  - Reduced JVM heap size from 2048m to 1024m
  - Reduced MaxMetaspaceSize from 512m to 256m
  - Kept other optimization settings unchanged (daemon, parallel, caching)

### [2024-12-31 16:59:10] Gradle Configuration Simplification
**What:** Simplified Gradle configuration to minimal settings
**Why:** Build still hanging at "Evaluating Settings" with previous configuration
**How:** 
- Updated gradle.properties with minimal settings:
  - Set JVM heap size to minimum (512m)
  - Disabled Gradle daemon
  - Disabled parallel execution
  - Disabled on-demand configuration
  - Disabled build caching
- This configuration minimizes complexity and potential points of failure

### [2024-12-31 17:01:25] Gradle Settings Simplification
**What:** Simplified Android settings.gradle configuration
**Why:** Build continues to hang at "Evaluating Settings" with minimal Gradle properties
**How:** 
- Modified settings.gradle to include only essential configurations:
  - Kept rootProject name
  - Kept basic app inclusion
  - Kept react-native-gradle-plugin inclusion
  - Temporarily commented out native modules configuration
  - Temporarily commented out new architecture settings
- This change helps isolate if the issue is related to native modules or new architecture configuration

### [2024-12-31 17:02:08] Process Cleanup and Error Investigation
**What:** Cleaned up running Java processes and investigated build error
**Why:** Multiple Java processes might be causing conflicts, and clean build revealed missing dependency
**How:** 
- Identified and terminated 5 running Java processes
- Attempted Gradle clean which revealed missing react-native-gradle-plugin
- Error indicates potential issue with node_modules installation

### [2024-12-31 17:03:26] Node Modules Reinstallation
**What:** Performed clean reinstallation of node_modules
**Why:** Missing react-native-gradle-plugin indicated potential node_modules issues
**How:** 
- Removed existing node_modules directory
- Deleted package-lock.json for clean slate
- Ran npm install to reinstall all dependencies
- Successfully installed 1196 packages
- Note: Some package deprecation warnings and vulnerabilities were reported but not critical for build

Next step: Try running the Android build again now that dependencies are properly installed.

### [2024-12-31 17:03:26] Gradle Build Attempt
**What:** Attempting to run the Android build again
**Why:** To verify if the build issue is resolved after reinstalling node_modules
**How:** 
- Running Gradle build with --no-daemon flag
- Monitoring build process for any errors or issues

Next steps:
1. Need to verify if node_modules are properly installed
2. May need to run `npm install` to restore missing dependencies
3. Then retry the build process

**Resolution:**
- Successfully fixed build by:
  1. Reducing JVM heap size to 512m
  2. Setting MaxMetaspaceSize to 256m
  3. Adding heap ratio controls (MinHeapFreeRatio=10, MaxHeapFreeRatio=20)
  4. Removing deprecated Gradle options
  5. Running Gradle with --no-daemon flag

### [2024-12-31 17:06:51] Debug Keystore Issue Identified
**What:** Build failed due to corrupted debug.keystore
**Why:** Error message: "Failed to read key androiddebugkey from store [...] debug.keystore: DerInputStream.getLength(): lengthTag=63, too big"
**How:** 
- Build process progressed past previous issues
- New error identified with debug signing configuration
- Need to regenerate debug.keystore file

Next step: Delete the corrupted debug.keystore and generate a new one.

### [2024-12-31 17:16:28] Debug Keystore Regeneration
**What:** Regenerated Android debug.keystore file
**Why:** Previous debug.keystore was corrupted causing build failure
**How:** 
- Deleted the corrupted debug.keystore file
- Generated new debug.keystore using keytool with standard debug configuration:
  - Alias: androiddebugkey
  - Store password: android
  - Key password: android
  - Validity: 10000 days
  - Key algorithm: RSA (2048 bits)
  - Distinguished Name: CN=Android Debug,O=Android,C=US

Next step: Retry the Android build with the new debug.keystore.

### [2024-12-31 17:16:28] Android Build Success
**What:** Successfully built and installed Android debug APK
**Why:** To verify the new debug.keystore is working correctly
**How:** 
- Ran `gradlew app:installDebug` command
- Build completed successfully in 1m 19s
- APK was installed on the emulator (Medium_Phone_API_35)

Next step: Test the app functionality on the emulator to ensure everything is working as expected.

### [2024-12-31 17:23:14] Metro Bundler Error
**What:** Metro bundler error in index.js
**Why:** Error indicates an undefined "id" argument that should be a string
**Error:** `index.js: The "id" argument must be of type string. Received undefined`
**Investigation:**
- Checked index.js and app.json
- The basic setup appears correct with proper app name registration
- Error likely coming from a component or library that's expecting an ID prop

Next step: Check App.js and its components for any missing ID props or incorrect prop types.

### [2024-12-31 17:23:14] Fixed Metro Bundler Error
**What:** Fixed the "id argument must be string" error in RoleSelector component
**Why:** The error was caused by using `id` property in roles array which was causing conflicts with React Native internals
**How:** 
- Changed the roles array structure from `{id: Role, label: string}` to `{role: Role, label: string}`
- Updated all references to use `role` instead of `id` in the component
- This ensures we're not conflicting with any internal React Native property names

Next step: Retry running the Metro bundler to verify the fix.

### [2024-12-31 19:07:20] Test Flow Navigation Structure Planning
**What:** Planning the implementation of complete test flow navigation structure
**Why:** Need to organize existing screens and implement missing ones for the test-taking flow
**How:** 
Analysis of current structure:
- Existing screens:
  - HomeScreen
  - ConfigureTestScreen
  - Auth screens
- Required new screens for test flow:
  1. TestSelectionScreen (for choosing test type)
  2. TestExecutionScreen (for taking the test)
  3. TestCompletionScreen (for test submission)
  4. TestResultsScreen (for viewing results and analysis)

Next steps:
1. Create TestNavigator to handle test flow
2. Implement missing screens
3. Set up navigation between screens with proper type safety
4. Implement state management for test progress

Current focus: Setting up the navigation structure before implementing individual screens