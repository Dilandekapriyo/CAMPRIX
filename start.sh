#!/bin/bash

# CAMPRIX Frontend & Backend Startup Script (Linux/Mac)

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   CAMPRIX - Frontend & Backend Setup                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node -v)"
echo ""

show_menu() {
    echo "════════════════════════════════════════════════════════════"
    echo "Setup Options:"
    echo "════════════════════════════════════════════════════════════"
    echo "1. Install dependencies (run once)"
    echo "2. Start backend only (port 3000)"
    echo "3. Start frontend only (port 5173)"
    echo "4. Start both backend and frontend"
    echo "5. Setup database (initialize tables)"
    echo "6. Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
}

install_deps() {
    clear
    echo ""
    echo "Installing backend dependencies..."
    cd backend
    npm install
    echo ""
    echo "Installing frontend dependencies..."
    cd ../frontend
    npm install
    cd ..
    echo ""
    echo "✓ Dependencies installed successfully!"
}

start_backend() {
    clear
    echo ""
    echo "Starting backend server on http://localhost:3000"
    echo "Press Ctrl+C to stop"
    echo ""
    cd backend
    npm start
}

start_frontend() {
    clear
    echo ""
    echo "Starting frontend server on http://localhost:5173"
    echo "Press Ctrl+C to stop"
    echo ""
    cd frontend
    npm run dev
}

start_both() {
    clear
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "Starting both servers..."
    echo "════════════════════════════════════════════════════════════"
    echo ""
    echo "Backend will run on: http://localhost:3000"
    echo "Frontend will run on: http://localhost:5173"
    echo ""
    echo "Starting backend in background..."
    echo ""
    
    # Start backend in background
    cd backend
    npm start &
    BACKEND_PID=$!
    cd ..
    
    echo "✓ Backend started (PID: $BACKEND_PID)"
    echo ""
    echo "Now starting frontend..."
    echo ""
    
    # Start frontend (will block in foreground)
    cd frontend
    npm run dev
    
    # When frontend is stopped, also kill backend
    kill $BACKEND_PID 2>/dev/null
}

setup_db() {
    clear
    echo ""
    echo "Setting up database..."
    cd backend
    npm run setup
    cd ..
    echo ""
    echo "✓ Database setup complete!"
}

# Main loop
while true; do
    show_menu
    
    case $choice in
        1) install_deps ;;
        2) start_backend ;;
        3) start_frontend ;;
        4) start_both ;;
        5) setup_db ;;
        6) exit 0 ;;
        *) echo "Invalid choice. Please try again." ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done
