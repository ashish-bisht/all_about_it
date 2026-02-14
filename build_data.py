#!/usr/bin/env python3
"""build_data.py

Build scripts for topic content.

This repo originally combined all topic files into a single `data.js`.
That made initial load slow (data.js was ~800KB).

Now we generate per-topic JS files under `data/topics/<topicId>.js`.
Each file assigns `window.currentTopicData = <topicObject>`.

Run:
  python3 build_data.py
"""

import os

TOPIC_SCRIPTS = [
    # DSA Topics
    'data/dsa/arrays.js',
    'data/dsa/binary_search.js',
    'data/dsa/linked_list.js',
    'data/dsa/stack.js',
    'data/dsa/trees.js',
    'data/dsa/graphs.js',
    'data/dsa/dp.js',
    'data/dsa/heap_trie.js',
    'data/dsa/backtracking.js',
    # Concepts
    'data/concepts/dp_concepts.js',
    'data/concepts/arrays_concepts.js',
    'data/concepts/graphs_concepts.js',
    'data/concepts/trees_concepts.js',
    'data/concepts/complexity_concepts.js',
    'data/concepts/stack_concepts.js',
    'data/concepts/backtracking_concepts.js',
]


def _topic_id_from_path(script_path: str) -> str:
    base = os.path.basename(script_path)
    return base.replace('.js', '')


def _topic_var_name(topic_id: str) -> str:
    # Topic files define: const topic_<id> = {...}
    return f'topic_{topic_id}'


def build_topics():
    out_dir = os.path.join('data', 'topics')
    os.makedirs(out_dir, exist_ok=True)

    built = 0
    for script_path in TOPIC_SCRIPTS:
        if not os.path.exists(script_path):
            print(f'Warning: {script_path} not found!')
            continue

        topic_id = _topic_id_from_path(script_path)
        topic_var = _topic_var_name(topic_id)

        with open(script_path, 'r') as f:
            content = f.read().strip()

        output_lines = [
            '// Auto-generated from data/ folder',
            '// Run `python3 build_data.py` to regenerate',
            f'// Source: {script_path}',
            f'// Topic: {topic_id}',
            '',
            content,
            '',
            f'window.currentTopicData = {topic_var};',
            '',
        ]

        out_file = os.path.join(out_dir, f'{topic_id}.js')
        with open(out_file, 'w') as f:
            f.write('\n'.join(output_lines))

        built += 1

    print(f'Built {built} topic files into {out_dir}/')

def build():
    build_topics()

if __name__ == '__main__':
    build()
