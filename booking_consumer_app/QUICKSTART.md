# 🚀 Quick Start Guide - Relogistics App

## Installation & Setup

### 1. Install Dependencies

Open PowerShell and navigate to the project:

```powershell
cd f:\Relogistics\booking_consumer_app
npm install
```

### 2. Start the Development Server

```powershell
npm start
```

This will start the Expo development server and show a QR code.

### 3. Run the App

**Option A: On Your Phone (Recommended for Testing)**

1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in the terminal
3. The app will load on your device

**Option B: On Android Emulator**

```powershell
npm run android
```

**Option C: On iOS Simulator (Mac only)**

```powershell
npm run ios
```

**Option D: In Web Browser**

```powershell
npm run web
```

## 🎯 Testing the App

### Login as Consumer

1. On the login screen, select **"Consumer"** role
2. Enter any email (e.g., `consumer@test.com`)
3. Enter any password (e.g., `password`)
4. Click "Sign In"

**Try these features:**

- ✅ Create a new booking
- ✅ Track shipments (use ID: BK001)
- ✅ View booking history
- ✅ Edit profile

### Login as Booking Agent

1. On the login screen, select **"Agent"** role
2. Enter any email (e.g., `agent@test.com`)
3. Enter any password (e.g., `password`)
4. Click "Sign In"

**Try these features:**

- ✅ View all bookings dashboard
- ✅ Assign trucks to pending bookings
- ✅ Manage trucks and drivers
- ✅ View reports and analytics

## 📱 App Structure Overview

### Consumer Flow

```
Splash → Login → Home Dashboard
                   ├─→ New Booking → Booking Confirmation
                   ├─→ My Bookings → Booking Details
                   ├─→ Track Shipment (Live Map)
                   └─→ Profile
```

### Agent Flow

```
Splash → Login → Dashboard
                   ├─→ Assign Truck → Select Truck & Driver
                   ├─→ Trucks & Drivers Management
                   ├─→ Reports & Analytics
                   └─→ Profile
```

## 🎨 Key Features to Explore

### 1. **New Booking (Consumer)**

- Enter pickup and delivery addresses
- Select truck type (Small/Medium/Large)
- Specify weight, quantity, and goods details
- Get instant price estimate
- Confirm booking

### 2. **Live Tracking (Consumer)**

- Enter tracking ID (try: BK001)
- See live map with truck location
- View pickup and delivery markers
- Watch simulated GPS movement

### 3. **Assign Truck (Agent)**

- View pending bookings
- Select available truck and driver
- Assign and update status
- View confirmation

### 4. **Reports (Agent)**

- View total deliveries
- Check revenue statistics
- See recent completed bookings
- Monitor performance metrics

## 🐛 Troubleshooting

### "Unable to resolve module..."

```powershell
# Clear cache and reinstall
rm -r node_modules
npm install
npx expo start -c
```

### "Metro bundler not starting"

```powershell
# Kill any running processes
taskkill /F /IM node.exe
npm start
```

### "Expo Go app can't connect"

- Ensure your computer and phone are on the same WiFi network
- Try using "Tunnel" connection mode: `npx expo start --tunnel`

## 📝 Sample Data

### Sample Booking IDs for Tracking:

- `BK001` - In Transit (New York → Boston)
- `BK002` - Pending (Chicago → Detroit)
- `BK003` - Delivered (San Francisco → Los Angeles)

### Sample Truck Types:

- **Small Truck**: 500 kg capacity, $300 base
- **Medium Truck**: 1000 kg capacity, $600 base
- **Large Truck**: 2000 kg capacity, $1000 base

## 🔄 Making Changes

### Modify Theme Colors:

Edit `src/config/theme.js`

### Add New Screen:

1. Create screen file in `src/screens/consumer/` or `src/screens/agent/`
2. Add to navigation in `src/navigation/ConsumerTabs.js` or `AgentTabs.js`

### Update Mock Data:

Edit `src/data/mockData.js`

## 📚 Learn More

- **React Native Docs**: https://reactnative.dev/
- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native Paper**: https://reactnativepaper.com/

## ✅ Next Steps

1. ✅ Test all screens and features
2. ✅ Customize colors and branding
3. ✅ Replace mock API with real backend
4. ✅ Add actual app icons and splash screen
5. ✅ Implement push notifications
6. ✅ Add form validation
7. ✅ Build for production

## 💡 Tips

- Use **Hot Reload**: Save files to see changes instantly
- Check **Console**: Press `Ctrl+M` (Android) or `Cmd+D` (iOS) to open dev menu
- **Debugging**: Use React Native Debugger or Flipper
- **State Inspection**: Use React DevTools

---

**Need Help?** Check the main README.md or create an issue!
