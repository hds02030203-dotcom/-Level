with open('js/bundle.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's inspect class and function structure
lines = code.split('\n')
print("Total lines in bundle.js:", len(lines))

# Check for any unclosed braces in classes
class_stack = []
for idx, line in enumerate(lines, 1):
    if 'class ' in line:
        print(f"Line {idx}: {line.strip()}")
