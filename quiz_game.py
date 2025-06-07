#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Quiz Game Module
Handles the interactive vocabulary quiz functionality
"""

import random
from typing import List, Tuple, Dict
from vocabulary_parser import VocabularyParser

class QuizGame:
    """Interactive vocabulary quiz game"""
    
    def __init__(self):
        self.parser = VocabularyParser()
        self.vocabulary_pairs: List[Tuple[str, str]] = []
        self.score = 0
        self.total_questions = 0
        self.hard_words: List[Tuple[str, str, str]] = []  # (question, answer, direction)
        self.session_stats = {
            'correct': 0,
            'incorrect': 0,
            'french_to_dutch': {'correct': 0, 'total': 0},
            'dutch_to_french': {'correct': 0, 'total': 0}
        }
    
    def initialize(self) -> bool:
        """Initialize the game by loading vocabulary"""
        print("🎓 French-Dutch Vocabulary Quiz Game")
        print("=" * 40)
        
        if not self.parser.load_vocabulary():
            print("❌ Failed to load vocabulary data!")
            return False
        
        self.vocabulary_pairs = self.parser.get_vocabulary_pairs()
        if not self.vocabulary_pairs:
            print("❌ No vocabulary pairs found!")
            return False
        
        print(f"✅ Loaded {len(self.vocabulary_pairs)} vocabulary pairs")
        return True
    
    def display_welcome(self):
        """Display welcome message and instructions"""
        print("\n📚 Welcome to your French exam preparation!")
        print("\nHow it works:")
        print("• You'll get random French ↔ Dutch translation questions")
        print("• Type your answer and press Enter")
        print("• Get immediate feedback on each answer")
        print("• Track your progress throughout the session")
        print("• Type 'quit' to exit, 'stats' to see your progress, or 'hard' to see hard words")
        print("\n" + "=" * 50)
    
    def generate_question(self) -> Tuple[str, str, str]:
        """
        Generate a random question
        Returns: (question, correct_answer, direction)
        """
        # Choose random vocabulary pair
        french, dutch = random.choice(self.vocabulary_pairs)
        
        # Choose random direction (French to Dutch or Dutch to French)
        if random.choice([True, False]):
            # French to Dutch
            question = f"🇫🇷 → 🇳🇱  Translate: {french}"
            answer = dutch
            direction = "french_to_dutch"
        else:
            # Dutch to French  
            question = f"🇳🇱 → 🇫🇷  Translate: {dutch}"
            answer = french
            direction = "dutch_to_french"
        
        return question, answer, direction
    
    def ask_question(self) -> bool:
        """
        Ask a single question and handle the response
        Returns True to continue, False to quit
        """
        question, correct_answer, direction = self.generate_question()
        
        print(f"\n📝 Question {self.total_questions + 1}")
        print(question)
        
        # Get user input
        user_answer = input("Your answer: ").strip()
        
        # Handle special commands
        if user_answer.lower() in ['quit', 'exit', 'q']:
            return False
        elif user_answer.lower() in ['stats', 'statistics', 's']:
            self.display_stats()
            return True
        elif user_answer.lower() in ['hard', 'hardwords', 'h']:
            self.display_hard_words()
            return True
        elif not user_answer:
            print("⚠️  Empty answer! Please try again.")
            return True
        
        # Check answer
        self.total_questions += 1
        self.session_stats[direction]['total'] += 1
        
        is_correct = self.parser.check_answer(user_answer, correct_answer)
        
        if is_correct:
            self.score += 1
            self.session_stats['correct'] += 1
            self.session_stats[direction]['correct'] += 1
            print("✅ Correct! Well done!")
        else:
            self.session_stats['incorrect'] += 1
            print(f"❌ Incorrect. The correct answer is: {correct_answer}")
            
            # Ask if user wants to add to hard words list
            add_to_hard = input("Add this word to your hard words list? (y/n): ").strip().lower()
            if add_to_hard in ['y', 'yes']:
                self.hard_words.append((question, correct_answer, direction))
                print("📝 Added to hard words list!")
        
        # Show current score
        percentage = (self.score / self.total_questions) * 100
        print(f"📊 Score: {self.score}/{self.total_questions} ({percentage:.1f}%)")
        
        return True
    
    def display_stats(self):
        """Display detailed session statistics"""
        print("\n" + "=" * 40)
        print("📈 SESSION STATISTICS")
        print("=" * 40)
        
        if self.total_questions == 0:
            print("No questions answered yet!")
            return
        
        # Overall stats
        percentage = (self.score / self.total_questions) * 100
        print(f"Overall Score: {self.score}/{self.total_questions} ({percentage:.1f}%)")
        print(f"Correct: {self.session_stats['correct']}")
        print(f"Incorrect: {self.session_stats['incorrect']}")
        
        # Direction-specific stats
        print("\nBy Direction:")
        
        # French to Dutch
        fr_to_nl = self.session_stats['french_to_dutch']
        if fr_to_nl['total'] > 0:
            fr_to_nl_pct = (fr_to_nl['correct'] / fr_to_nl['total']) * 100
            print(f"🇫🇷 → 🇳🇱: {fr_to_nl['correct']}/{fr_to_nl['total']} ({fr_to_nl_pct:.1f}%)")
        
        # Dutch to French
        nl_to_fr = self.session_stats['dutch_to_french']
        if nl_to_fr['total'] > 0:
            nl_to_fr_pct = (nl_to_fr['correct'] / nl_to_fr['total']) * 100
            print(f"🇳🇱 → 🇫🇷: {nl_to_fr['correct']}/{nl_to_fr['total']} ({nl_to_fr_pct:.1f}%)")
        
        print("=" * 40)
    
    def display_hard_words(self):
        """Display the current hard words list"""
        print("\n" + "=" * 40)
        print("📝 HARD WORDS LIST")
        print("=" * 40)
        
        if not self.hard_words:
            print("No hard words in your list yet!")
            print("When you get a question wrong, you can add it to this list.")
            return
        
        print(f"You have {len(self.hard_words)} hard words:")
        print()
        
        for i, (question, answer, direction) in enumerate(self.hard_words, 1):
            # Clean up the question to show just the word
            if "🇫🇷 → 🇳🇱" in question:
                word = question.replace("🇫🇷 → 🇳🇱  Translate: ", "")
                print(f"{i}. {word} (French) → {answer} (Dutch)")
            elif "🇳🇱 → 🇫🇷" in question:
                word = question.replace("🇳🇱 → 🇫🇷  Translate: ", "")
                print(f"{i}. {word} (Dutch) → {answer} (French)")
        
        print("=" * 40)
        
        # Ask if user wants to practice hard words
        practice_hard = input("\nWould you like to practice only your hard words? (y/n): ").strip().lower()
        if practice_hard in ['y', 'yes']:
            self.practice_hard_words()
    
    def practice_hard_words(self):
        """Practice session focused on hard words only"""
        if not self.hard_words:
            print("No hard words to practice!")
            return
        
        print(f"\n🎯 HARD WORDS PRACTICE SESSION")
        print(f"Practicing {len(self.hard_words)} difficult words")
        print("=" * 50)
        
        # Create a temporary copy of hard words for practice
        practice_words = self.hard_words.copy()
        random.shuffle(practice_words)
        
        correct_in_practice = 0
        total_in_practice = 0
        
        for question, correct_answer, direction in practice_words:
            print(f"\n📝 Hard Word Practice")
            print(question)
            
            user_answer = input("Your answer: ").strip()
            
            # Handle special commands
            if user_answer.lower() in ['quit', 'exit', 'q']:
                break
            elif not user_answer:
                print("⚠️  Empty answer! Skipping...")
                continue
            
            total_in_practice += 1
            is_correct = self.parser.check_answer(user_answer, correct_answer)
            
            if is_correct:
                correct_in_practice += 1
                print("✅ Correct! Great improvement!")
                
                # Ask if they want to remove from hard words
                remove_word = input("Remove this word from hard words list? (y/n): ").strip().lower()
                if remove_word in ['y', 'yes']:
                    self.hard_words.remove((question, correct_answer, direction))
                    print("🗑️  Removed from hard words list!")
            else:
                print(f"❌ Still incorrect. The answer is: {correct_answer}")
                print("Keep practicing this one!")
        
        # Show practice results
        if total_in_practice > 0:
            practice_percentage = (correct_in_practice / total_in_practice) * 100
            print(f"\n🎯 Hard Words Practice Results:")
            print(f"Score: {correct_in_practice}/{total_in_practice} ({practice_percentage:.1f}%)")
            print(f"Hard words remaining: {len(self.hard_words)}")
    
    def display_final_results(self):
        """Display final results when quitting"""
        print("\n" + "🎯 FINAL RESULTS " + "🎯")
        print("=" * 40)
        
        if self.total_questions == 0:
            print("No questions were answered. Come back when you're ready to study! 📚")
            return
        
        percentage = (self.score / self.total_questions) * 100
        
        print(f"Questions Answered: {self.total_questions}")
        print(f"Correct Answers: {self.score}")
        print(f"Incorrect Answers: {self.session_stats['incorrect']}")
        print(f"Final Score: {percentage:.1f}%")
        
        # Performance feedback
        if percentage >= 90:
            print("🌟 Excellent! You're ready for your exam!")
        elif percentage >= 80:
            print("👍 Great job! Keep practicing and you'll ace it!")
        elif percentage >= 70:
            print("📖 Good progress! A bit more practice will help.")
        elif percentage >= 60:
            print("📚 You're getting there! Keep studying.")
        else:
            print("💪 Don't give up! Practice makes perfect!")
        
        print("\nBonne chance avec ton examen! (Good luck with your exam!) 🍀")
    
    def run(self):
        """Main game loop"""
        if not self.initialize():
            return
        
        self.display_welcome()
        
        try:
            while True:
                if not self.ask_question():
                    break
                
                # Ask if user wants to continue after every 5 questions
                if self.total_questions > 0 and self.total_questions % 5 == 0:
                    print(f"\n🎉 You've completed {self.total_questions} questions!")
                    
                    # Show hard words list every 5 questions if there are any
                    if self.hard_words:
                        print(f"\n📝 Your current hard words list ({len(self.hard_words)} words):")
                        for i, (question, answer, direction) in enumerate(self.hard_words, 1):
                            if "🇫🇷 → 🇳🇱" in question:
                                word = question.replace("🇫🇷 → 🇳🇱  Translate: ", "")
                                print(f"  {i}. {word} → {answer}")
                            elif "🇳🇱 → 🇫🇷" in question:
                                word = question.replace("🇳🇱 → 🇫🇷  Translate: ", "")
                                print(f"  {i}. {word} → {answer}")
                    
                    continue_input = input("Continue practicing? (y/n/stats/hard): ").lower().strip()
                    if continue_input in ['n', 'no', 'quit', 'exit']:
                        break
                    elif continue_input in ['stats', 'statistics', 's']:
                        self.display_stats()
                    elif continue_input in ['hard', 'hardwords', 'h']:
                        self.display_hard_words()
        
        except KeyboardInterrupt:
            print("\n\n⚠️  Quiz interrupted by user")
        
        finally:
            self.display_final_results()

def main():
    """Main function to run the quiz game"""
    game = QuizGame()
    game.run()

if __name__ == "__main__":
    main()
