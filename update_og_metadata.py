#!/usr/bin/env python3
import os
import re

# Find all HTML files
html_files = []
for file in os.listdir('.'):
    if file.endswith('.html'):
        html_files.append(file)

print(f"Found {len(html_files)} HTML files to update")

# Metadata to update
old_og_image = 'https://bobhomecare.com/images/social-preview-v3.jpg?v=3'
new_og_image = '/images/social-preview-v3.jpg?v=4'
old_twitter_image = 'https://bobhomecare.com/images/social-preview-v3.jpg?v=3'
new_twitter_image = '/images/social-preview-v3.jpg?v=4'
old_secure_url = 'https://bobhomecare.com/images/social-preview-v3.jpg?v=3'
new_secure_url = 'https://bobhomecare.com/images/social-preview-v3.jpg?v=4'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace og:image
    content = content.replace(old_og_image, new_og_image)
    
    # Replace twitter:image
    content = content.replace(old_twitter_image, new_twitter_image)
    
    # Replace og:image:secure_url
    content = content.replace(old_secure_url, new_secure_url)
    
    # Fix og:url format if needed
    content = re.sub(r'<meta property="og:url" content="https://bobhomecare\.com/">', 
                     '<meta property="og:url" content="https://bobhomecare.com">', 
                     content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated: {file}")

print("\n✅ All HTML files updated successfully!")
