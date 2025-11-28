import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace missing image references with available ones
replacements = {
    'images/bob-logo.png': 'images/GreenBG.png',
    'images/Housekeeping-5.jpg': 'images/Housekeeping-11.jpg',
    'images/Housekeeping-10.jpg': 'images/Housekeeping-11.jpg',
    'images/Housekeeping-15.jpg': 'images/Housekeeping-11.jpg',
    'images/ChaletMarina7-23.jpg': 'images/ChaletMarina7-4.jpg',
    'images/ChaletMarina7-49.jpg': 'images/ChaletMarina7-4.jpg',
    'images/Stella-26.jpg': 'images/Housekeeping-11.jpg',
    'images/c80dfdb2-edd7-44c5-816e-a52e3caa46d1.jpg': 'images/IMG_3140.jpeg',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all image references")
