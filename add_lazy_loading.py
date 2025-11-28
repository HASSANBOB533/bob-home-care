#!/usr/bin/env python3
import os
import re
from pathlib import Path

def add_lazy_loading_to_html(file_path):
    """Add loading='lazy' to all img tags that don't already have it"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to find img tags without loading attribute
    # This regex finds img tags and checks if they already have loading attribute
    pattern = r'<img\s+(?!.*loading=)([^>]*?)>'
    
    def add_loading(match):
        img_tag = match.group(1)
        # Add loading="lazy" before the closing >
        return f'<img {img_tag} loading="lazy">'
    
    content = re.sub(pattern, add_loading, content, flags=re.IGNORECASE)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Process all HTML files
html_files = [
    '/home/ubuntu/bob-home-care/index.html',
    '/home/ubuntu/bob-home-care/blog-airbnb-cleaning.html',
    '/home/ubuntu/bob-home-care/blog-bathroom-cleaning.html',
    '/home/ubuntu/bob-home-care/blog-bedroom-cleaning.html',
    '/home/ubuntu/bob-home-care/blog-cleaning-schedule.html',
    '/home/ubuntu/bob-home-care/blog-eco-products.html',
    '/home/ubuntu/bob-home-care/blog-kitchen-cleaning.html',
]

print("Adding lazy loading to all HTML files...")
for file_path in html_files:
    if os.path.exists(file_path):
        if add_lazy_loading_to_html(file_path):
            print(f"✅ Updated: {Path(file_path).name}")
        else:
            print(f"⚠️  Already has lazy loading: {Path(file_path).name}")
    else:
        print(f"❌ File not found: {file_path}")

print("\n✅ Lazy loading added to all images!")
