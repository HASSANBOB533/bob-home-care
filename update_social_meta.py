#!/usr/bin/env python3
import re
import os

# Social metadata template
SOCIAL_META = '''    <meta name="description" content="خدمات تنظيف موثوقة للمنازل والمكاتب وشقق Airbnb بأعلى معايير الجودة في القاهرة والجيزة والإسكندرية.">
    
    <!-- OpenGraph Meta Tags for Social Sharing -->
    <meta property="og:title" content="BOB Home Care – خدمات تنظيف منزلية احترافية بمعايير الضيافة الفندقية">
    <meta property="og:description" content="خدمات تنظيف موثوقة للمنازل والمكاتب وشقق Airbnb بأعلى معايير الجودة في القاهرة والجيزة والإسكندرية.">
    <meta property="og:image" content="https://bobhomecare.com/images/social-preview.jpg?v=2">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="BOB Home Care - Professional Home Cleaning Services">
    <meta property="og:url" content="https://bobhomecare.com/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="BOB Home Care">
    <meta property="og:locale" content="ar_EG">
    <meta property="og:locale:alternate" content="en_US">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="BOB Home Care – خدمات تنظيف منزلية احترافية بمعايير الضيافة الفندقية">
    <meta name="twitter:description" content="خدمات تنظيف موثوقة للمنازل والمكاتب وشقق Airbnb بأعلى معايير الجودة في القاهرة والجيزة والإسكندرية.">
    <meta name="twitter:image" content="https://bobhomecare.com/images/social-preview.jpg?v=2">
    <meta name="twitter:image:alt" content="BOB Home Care - Professional Home Cleaning Services">
    
    <!-- WhatsApp & Telegram Meta Tags -->
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:secure_url" content="https://bobhomecare.com/images/social-preview.jpg?v=2">'''

# Blog pages to update
blog_pages = [
    'blog-airbnb-cleaning.html',
    'blog-bathroom-cleaning.html',
    'blog-bedroom-cleaning.html',
    'blog-cleaning-schedule.html',
    'blog-eco-products.html',
    'blog-kitchen-cleaning.html'
]

for page in blog_pages:
    filepath = f'/home/ubuntu/bob-home-care/{page}'
    if not os.path.exists(filepath):
        print(f"Skipping {page} - file not found")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if social meta already exists
    if 'og:image:secure_url' in content:
        print(f"✓ {page} already has social metadata")
        continue
    
    # Find the position after <title> tag
    title_match = re.search(r'(<title>.*?</title>)', content, re.DOTALL)
    if not title_match:
        print(f"✗ {page} - Could not find <title> tag")
        continue
    
    # Remove old og tags if they exist
    content = re.sub(r'\s*<meta property="og:.*?>\n?', '', content)
    content = re.sub(r'\s*<meta name="twitter:.*?>\n?', '', content)
    
    # Insert social metadata after title
    insert_pos = title_match.end()
    new_content = content[:insert_pos] + '\n' + SOCIAL_META + '\n' + content[insert_pos:]
    
    # Write updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Updated {page}")

print("\n✅ All blog pages updated with social metadata")
