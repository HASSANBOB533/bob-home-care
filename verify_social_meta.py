#!/usr/bin/env python3
import re
import os

html_files = [
    'index.html',
    'blog-airbnb-cleaning.html',
    'blog-bathroom-cleaning.html',
    'blog-bedroom-cleaning.html',
    'blog-cleaning-schedule.html',
    'blog-eco-products.html',
    'blog-kitchen-cleaning.html'
]

required_tags = [
    'og:title',
    'og:description',
    'og:image',
    'og:image:width',
    'og:image:height',
    'og:url',
    'og:type',
    'twitter:card',
    'twitter:image',
    'og:image:secure_url'
]

print("=" * 80)
print("SOCIAL METADATA VERIFICATION REPORT")
print("=" * 80)

all_passed = True

for html_file in html_files:
    filepath = f'/home/ubuntu/bob-home-care/{html_file}'
    if not os.path.exists(filepath):
        print(f"\n❌ {html_file} - FILE NOT FOUND")
        all_passed = False
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"\n📄 {html_file}")
    print("-" * 80)
    
    missing_tags = []
    for tag in required_tags:
        if tag not in content:
            missing_tags.append(tag)
    
    if missing_tags:
        print(f"❌ MISSING TAGS: {', '.join(missing_tags)}")
        all_passed = False
    else:
        print("✅ ALL REQUIRED TAGS PRESENT")
    
    # Check image URL
    og_image_match = re.search(r'<meta property="og:image" content="([^"]+)"', content)
    if og_image_match:
        image_url = og_image_match.group(1)
        print(f"   Image: {image_url}")
        if 'social-preview.jpg' in image_url and '?v=' in image_url:
            print("   ✅ Cache-busting enabled")
        else:
            print("   ⚠️  Cache-busting may be missing")
    
    # Check title
    og_title_match = re.search(r'<meta property="og:title" content="([^"]+)"', content)
    if og_title_match:
        title = og_title_match.group(1)
        if 'BOB Home Care' in title:
            print(f"   ✅ Title: {title[:50]}...")
        else:
            print(f"   ⚠️  Title may need update: {title[:50]}...")

print("\n" + "=" * 80)
if all_passed:
    print("✅ ALL PAGES PASSED VERIFICATION")
else:
    print("❌ SOME PAGES NEED ATTENTION")
print("=" * 80)
