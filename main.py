#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
French-Dutch Vocabulary Learning Game
Main entry point for the vocabulary quiz application

This application helps you practice French-Dutch translations
for your French exam preparation.
"""

import sys
import os
from quiz_game import QuizGame

def main():
    """Main application entry point"""
    try:
        # Check if vocabulary file exists
        vocab_file = "vocabulary_data.txt"
        if not os.path.exists(vocab_file):
            print(f"❌ Error: Vocabulary file '{vocab_file}' not found!")
            print("Please make sure the vocabulary data file is in the same directory.")
            return 1
        
        # Initialize and run the quiz game
        game = QuizGame()
        game.run()
        
        return 0
        
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
