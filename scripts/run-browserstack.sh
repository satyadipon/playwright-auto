#!/bin/bash

# Dynamic BrowserStack configuration selector
# Usage: ./scripts/run-browserstack.sh [desktop|mobile]
# Or set SCREEN_TYPE environment variable

SCREEN_TYPE=${1:-$SCREEN_TYPE}

if [ -z "$SCREEN_TYPE" ]; then
    echo "❌ Please specify SCREEN_TYPE as 'desktop' or 'mobile'"
    echo "Usage: SCREEN_TYPE=desktop npm run test-browserstack"
    echo "   or: ./scripts/run-browserstack.sh desktop"
    exit 1
fi

case "$SCREEN_TYPE" in
    "desktop")
        echo "🖥️  Running Desktop tests on macOS Safari and Windows Edge"
        BROWSERSTACK_CONFIG_FILE="browserstack-desktop.yml"
        ;;
    "mobile")
        echo "📱 Running Mobile tests on Samsung Galaxy S22 Chrome and iPhone 14 Pro Safari"
        BROWSERSTACK_CONFIG_FILE="browserstack-mobile.yml"
        ;;
    *)
        echo "❌ Invalid SCREEN_TYPE: $SCREEN_TYPE"
        echo "Valid options: desktop, mobile"
        exit 1
        ;;
esac

# Copy the selected config to browserstack.yml
cp "$BROWSERSTACK_CONFIG_FILE" browserstack.yml

echo "✅ Using configuration: $BROWSERSTACK_CONFIG_FILE"
echo "🚀 Starting BrowserStack tests..."

# Run the tests
npx browserstack-node-sdk playwright test "$@"