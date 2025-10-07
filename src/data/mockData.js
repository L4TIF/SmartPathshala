export const mockModules = [
    {
        id: "mod-python",
        moduleName: "Python Programming",
        description: "Master Python from fundamentals to practical applications: syntax, data structures, control flow, functions, OOP, file I/O, virtual environments, and real-world scripting patterns.",
    },
    {
        id: "mod-computer-basics",
        moduleName: "Basic Computer Skills",
        description: "Build core digital skills: hardware vs software, operating systems, file management, keyboard shortcuts, settings, and safe daily computer usage.",
    },
    {
        id: "mod-digital-literacy",
        moduleName: "Digital Literacy",
        description: "Navigate the web responsibly: search strategies, evaluating sources, privacy, security, safe browsing, email etiquette, and digital footprints.",
    },
];

export const mockSubmodulesByModuleId = {
    "mod-python": [
        {
            id: "sub-py-1",
            title: "Introduction to Python",
            content: "Python is a versatile, high-level programming language widely used in web development, data science, automation, and AI.\n\nWhy Python?\n- Simple, readable syntax\n- Huge ecosystem (pip packages)\n- Strong community and documentation\n\nSetup Steps:\n1) Install Python 3.10+\n2) Verify with `python --version`\n3) Create a virtual environment using `python -m venv .venv`\n4) Activate it and install packages with `pip install <package>`",
            resourceName: "intro-python.pdf",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            codeSnippet: "# hello.py\nprint('Hello, SmartPathshala!')\n\n# Run: python hello.py",
        },
        {
            id: "sub-py-2",
            title: "Data Types and Variables",
            content: "Core data types: int, float, bool, str, list, tuple, dict, set.\n\nGuidelines:\n- Use snake_case variable names\n- Prefer f-strings for formatting\n- Choose immutable types (tuple) for fixed collections\n\nCommon Operations:\n- Slicing strings/lists\n- Dict lookups and updates\n- Set membership and uniqueness",
            resourceName: "data-types.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
            codeSnippet: "age = 21\npi = 3.14159\nname = 'Ada'\nlangs = ['Python', 'JS']\nuser = {'name': name, 'age': age}\nprint(f'{name} knows {len(langs)} languages')",
        },
        {
            id: "sub-py-3",
            title: "Control Flow",
            content: "Use `if/elif/else` for branching; `for` for iteration; `while` for loops with conditions; and `try/except` for error handling.\n\nBest Practices:\n- Keep conditions simple and readable\n- Use `break`/`continue` sparingly\n- Handle exceptions narrowly (catch specific errors)",
            resourceName: "control-flow.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
            codeSnippet: "for i in range(6):\n    if i % 2 == 0:\n        print(f'{i} is even')\n    else:\n        print(f'{i} is odd')",
        },
        {
            id: "sub-py-4",
            title: "Functions and Modules",
            content: "Functions encapsulate reusable logic. Use type hints and docstrings for clarity. Organize code into modules and packages to improve maintainability.\n\nGuidelines:\n- Keep functions small and focused\n- Avoid side-effects; return values instead\n- Prefer explicit over implicit imports",
            resourceName: "functions-modules.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
            codeSnippet: "from typing import List\n\ndef greet(name: str) -> str:\n    \"\"\"Return a friendly greeting.\n\n    Args:\n        name: Person's name.\n\n    Returns:\n        Greeting string.\n    \"\"\"\n    return f'Hello, {name}!'\n\nif __name__ == '__main__':\n    print(greet('Ada'))",
        },
        {
            id: "sub-py-5",
            title: "Object-Oriented Programming",
            content: "Model real-world entities with classes. Favor composition over inheritance. Implement `__repr__` for debugging and use properties to control attribute access.",
            resourceName: "oop-basics.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
            codeSnippet: "class Counter:\n    def __init__(self, start: int = 0):\n        self.value = start\n    def increment(self) -> None:\n        self.value += 1\n    def __repr__(self) -> str:\n        return f'Counter(value={self.value})'\n\nc = Counter()\nc.increment()\nprint(c)",
        },
        {
            id: "sub-py-6",
            title: "File I/O and Context Managers",
            content: "Safely read and write files using context managers. Understand encodings and newline handling. Use `pathlib` for clean path manipulations.",
            resourceName: "file-io.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
            codeSnippet: "from pathlib import Path\n\ntext = 'alpha\\nbeta\\ngamma'\nPath('words.txt').write_text(text, encoding='utf-8')\nprint(Path('words.txt').read_text(encoding='utf-8'))",
        },
    ],
    "mod-computer-basics": [
        {
            id: "sub-cb-1",
            title: "Hardware vs Software",
            content: "Hardware is the physical machinery (CPU, RAM, storage, motherboard, peripherals). Software includes the OS and applications that instruct hardware.\n\nKey Concepts:\n- CPU executes instructions\n- RAM holds working data\n- Storage persists files\n- Peripherals provide input/output",
            resourceName: "hardware-software.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
            codeSnippet: "# Conceptual; no code required\nparts = ['CPU','RAM','Storage','Motherboard','Peripherals']\nprint(', '.join(parts))",
        },
        {
            id: "sub-cb-2",
            title: "Operating Systems",
            content: "The OS manages hardware resources and provides services for programs. Learn filesystems, processes, permissions, updates, and settings.\n\nEveryday Tasks:\n- Create, rename, and move files\n- Install/uninstall software\n- Manage startup apps and updates",
            resourceName: "operating-systems.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969059.png",
            codeSnippet: "# Terminal examples\nuname -a\nls -la\ncat /etc/os-release",
        },
    ],
    "mod-digital-literacy": [
        {
            id: "sub-dl-1",
            title: "Safe Browsing",
            content: "Protect yourself online: verify URLs, look for HTTPS, use password managers, enable 2FA, and keep software updated. Recognize phishing and avoid oversharing.\n\nChecklist:\n- Strong, unique passwords\n- MFA enabled\n- Privacy settings reviewed\n- Backup important data",
            resourceName: "safe-browsing.pdf",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/545/545682.png",
            codeSnippet: "// Security hygiene\nconst isHttps = location.protocol === 'https:';\nconsole.log('HTTPS:', isHttps);",
        },
    ],
};

export const mockModuleExams = {
    'mod-python': [
        {
            id: 'mp-q1',
            question: 'Which statement is used to define a function in Python?',
            options: ['function', 'def', 'fn', 'proc'],
            answerIndex: 1,
        },
        {
            id: 'mp-q2',
            question: 'Which of these is an immutable data type?',
            options: ['list', 'dict', 'set', 'tuple'],
            answerIndex: 3,
        },
        {
            id: 'mp-q3',
            question: 'What does the built-in len() function return?',
            options: ['Memory size', 'Number of elements', 'Type of object', 'Hash value'],
            answerIndex: 1,
        },
    ],
};


