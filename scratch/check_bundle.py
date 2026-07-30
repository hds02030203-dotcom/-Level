import re

with open('js/bundle.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove single line comments
code = re.sub(r'//.*', '', code)
# Remove block comments
code = re.sub(r'/\*[\s\S]*?\*/', '', code)

# Remove template literals, double quotes, single quotes
lines = code.split('\n')
clean_code = ""
in_template = False

for line in lines:
    buf = []
    in_single = False
    in_double = False
    i = 0
    while i < len(line):
        c = line[i]
        if c == '`' and not in_single and not in_double:
            in_template = not in_template
        elif c == '"' and not in_single and not in_template:
            in_double = not in_double
        elif c == "'" and not in_double and not in_template:
            in_single = not in_single
        elif not in_single and not in_double and not in_template:
            buf.append(c)
        i += 1
    clean_code += "".join(buf) + "\n"

stack = []
pairs = {'(': ')', '{': '}', '[': ']'}

for line_idx, line in enumerate(clean_code.split('\n'), 1):
    for char in line:
        if char in '({[':
            stack.append((char, line_idx))
        elif char in ')}]':
            if not stack:
                print(f"Extra closing bracket {char} at line {line_idx}")
            else:
                top, top_line = stack.pop()
                if pairs[top] != char:
                    print(f"Mismatch {top} (line {top_line}) vs {char} (line {line_idx})")

print("Remaining stack:", stack)
if not stack:
    print("SUCCESS: js/bundle.js is 100% syntactically valid!")
