# Installation & Setup Script

# This file contains all the commands to set up and run the Relogistics app
# Copy and paste these commands into PowerShell

# ═══════════════════════════════════════════════════════════
# STEP 1: Navigate to Project Directory
# ═══════════════════════════════════════════════════════════

cd f:\Relogistics\booking_consumer_app

# ═══════════════════════════════════════════════════════════
# STEP 2: Install Dependencies
# ═══════════════════════════════════════════════════════════

npm install

# This will install:
# - React Native 0.74
# - Expo SDK ~51.0
# - React Navigation
# - React Native Paper
# - Axios
# - React Native Maps
# - All other dependencies

# ═══════════════════════════════════════════════════════════
# STEP 3: Start Development Server
# ═══════════════════════════════════════════════════════════

# Option A: Normal start
npm start

# Option B: Start with cache cleared (if you have issues)
# npx expo start -c

# Option C: Start in tunnel mode (for remote testing)
# npx expo start --tunnel

# ═══════════════════════════════════════════════════════════
# STEP 4: Run on Different Platforms
# ═══════════════════════════════════════════════════════════

# Android (requires Android Studio & Emulator or physical device)
# npm run android

# iOS (requires Mac with Xcode)
# npm run ios

# Web Browser
# npm run web

# ═══════════════════════════════════════════════════════════
# TROUBLESHOOTING COMMANDS
# ═══════════════════════════════════════════════════════════

# Clear cache and restart
# rm -r node_modules
# npm install
# npx expo start -c

# Kill all node processes (if port is already in use)
# taskkill /F /IM node.exe

# Update Expo CLI globally
# npm install -g expo-cli

# Check Expo version
# expo --version

# ═══════════════════════════════════════════════════════════
# USEFUL DEVELOPMENT COMMANDS
# ═══════════════════════════════════════════════════════════

# Open DevTools in browser
# Press 'w' in the terminal after starting

# Toggle element inspector
# Press 'i' in the terminal

# Toggle performance monitor
# Press 'p' in the terminal

# Reload app
# Press 'r' in the terminal

# ═══════════════════════════════════════════════════════════
# BUILDING FOR PRODUCTION
# ═══════════════════════════════════════════════════════════

# Install EAS CLI (Expo Application Services)
# npm install -g eas-cli

# Login to Expo
# eas login

# Configure build
# eas build:configure

# Build for Android
# eas build --platform android

# Build for iOS
# eas build --platform ios

# Build for both platforms
# eas build --platform all

# ═══════════════════════════════════════════════════════════
# PROJECT STRUCTURE VERIFICATION
# ═══════════════════════════════════════════════════════════

# List all project files
# Get-ChildItem -Recurse -File | Select-Object FullName

# Check if all required files exist
# Test-Path "App.js"
# Test-Path "package.json"
# Test-Path "src/contexts/AuthContext.js"
# Test-Path "src/navigation/RootNavigator.js"

# ═══════════════════════════════════════════════════════════
# NOTES
# ═══════════════════════════════════════════════════════════

# - Ensure you have Node.js v16+ installed
# - For Android: Install Android Studio and set up an emulator
# - For iOS: Requires macOS with Xcode
# - For testing on physical device: Install "Expo Go" app
# - The app uses mock data - no backend required for testing
# - All API calls are simulated with delays

# ═══════════════════════════════════════════════════════════
# QUICK TEST CHECKLIST
# ═══════════════════════════════════════════════════════════

# After app starts:
# 1. ✓ Login as Consumer (any email/password)
# 2. ✓ Create a new booking
# 3. ✓ Track shipment (use ID: BK001)
# 4. ✓ View booking details
# 5. ✓ Logout and login as Agent
# 6. ✓ View dashboard
# 7. ✓ Assign truck to pending booking
# 8. ✓ Check reports

# ═══════════════════════════════════════════════════════════
# ENVIRONMENT SETUP (Optional)
# ═══════════════════════════════════════════════════════════

# Create .env file for API configuration
# New-Item -Path ".env" -ItemType File

# Add to .env:
# API_BASE_URL=https://api.yourbackend.com
# GOOGLE_MAPS_API_KEY=your_api_key_here

# ═══════════════════════════════════════════════════════════
# GIT COMMANDS (Optional)
# ═══════════════════════════════════════════════════════════

# Initialize git repository
# git init

# Add all files
# git add .

# Commit
# git commit -m "Initial commit: Relogistics mobile app"

# Add remote
# git remote add origin https://github.com/yourusername/relogistics.git

# Push to remote
# git push -u origin main

# ═══════════════════════════════════════════════════════════
# END OF SETUP SCRIPT
# ═══════════════════════════════════════════════════════════
