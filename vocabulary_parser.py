#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vocabulary Parser Module
Handles parsing and loading of French-Dutch vocabulary pairs
"""

import re
from typing import List, Tuple, Dict

class VocabularyParser:
    """Parser for French-Dutch vocabulary data"""
    
    def __init__(self, filename: str = "vocabulary_data.txt"):
        self.filename = filename
        self.vocabulary_pairs: List[Tuple[str, str]] = []
    
    def load_vocabulary(self) -> bool:
        """
        Load vocabulary pairs from the data file
        Returns True if successful, False otherwise
        """
        try:
            with open(self.filename, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            
            self.vocabulary_pairs = []
            for line_num, line in enumerate(lines, 1):
                line = line.strip()
                if not line or line.startswith('#'):  # Skip empty lines and comments
                    continue
                
                # Split by pipe character
                if '|' in line:
                    parts = line.split('|', 1)
                    if len(parts) == 2:
                        french = parts[0].strip()
                        dutch = parts[1].strip()
                        
                        if french and dutch:
                            self.vocabulary_pairs.append((french, dutch))
                        else:
                            print(f"Warning: Empty translation found on line {line_num}")
                    else:
                        print(f"Warning: Invalid format on line {line_num}: {line}")
                else:
                    print(f"Warning: No separator found on line {line_num}: {line}")
            
            print(f"Successfully loaded {len(self.vocabulary_pairs)} vocabulary pairs")
            return len(self.vocabulary_pairs) > 0
            
        except FileNotFoundError:
            print(f"Error: Could not find vocabulary file '{self.filename}'")
            return False
        except UnicodeDecodeError:
            print(f"Error: Could not decode vocabulary file '{self.filename}' as UTF-8")
            return False
        except Exception as e:
            print(f"Error loading vocabulary: {e}")
            return False
    
    def get_vocabulary_pairs(self) -> List[Tuple[str, str]]:
        """Return the loaded vocabulary pairs"""
        return self.vocabulary_pairs.copy()
    
    def get_vocabulary_count(self) -> int:
        """Return the number of loaded vocabulary pairs"""
        return len(self.vocabulary_pairs)
    
    def clean_text(self, text: str) -> str:
        """
        Clean text by removing extra whitespace and normalizing
        """
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        return text
    
    def normalize_answer(self, answer: str) -> str:
        """
        Normalize user answer for comparison
        - Convert to lowercase
        - Remove extra whitespace
        - Remove common punctuation
        """
        answer = answer.lower().strip()
        # Remove common punctuation but keep essential characters
        answer = re.sub(r'[.,;:!?()"\'-]', '', answer)
        # Normalize whitespace
        answer = re.sub(r'\s+', ' ', answer)
        return answer
    
    def check_answer(self, user_answer: str, correct_answer: str) -> bool:
        """
        Check if user answer matches the correct answer
        Handles multiple possible translations separated by commas
        """
        user_normalized = self.normalize_answer(user_answer)
        
        # Split correct answer by comma to handle multiple translations
        possible_answers = [self.normalize_answer(ans.strip()) 
                          for ans in correct_answer.split(',')]
        
        # Also split by '/' for alternative forms
        all_possible = []
        for ans in possible_answers:
            all_possible.extend([self.normalize_answer(a.strip()) 
                               for a in ans.split('/')])
        
        return user_normalized in all_possible

def test_parser():
    """Test function for the vocabulary parser"""
    parser = VocabularyParser()
    if parser.load_vocabulary():
        pairs = parser.get_vocabulary_pairs()
        print(f"\nFirst 5 vocabulary pairs:")
        for i, (french, dutch) in enumerate(pairs[:5]):
            print(f"{i+1}. {french} → {dutch}")
        
        # Test answer checking
        print("\nTesting answer checking:")
        test_cases = [
            ("de puber", "de puber (14-18 jaar)", True),
            ("puber", "de puber (14-18 jaar)", True),
            ("De Puber", "de puber (14-18 jaar)", True),
            ("wrong answer", "de puber (14-18 jaar)", False),
        ]
        
        for user_ans, correct_ans, expected in test_cases:
            result = parser.check_answer(user_ans, correct_ans)
            status = "✓" if result == expected else "✗"
            print(f"{status} '{user_ans}' vs '{correct_ans}' → {result}")

if __name__ == "__main__":
    test_parser()
