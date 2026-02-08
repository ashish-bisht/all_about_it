// data/index.js
// Main entry point that loads all topic files and combines them into prepData
// This file is loaded AFTER all the individual topic files

// Combine all topics into prepData
const prepData = {
    // DSA Topics
    arrays: topic_arrays,
    binary_search: topic_binary_search,
    linked_list: topic_linked_list,
    stack: topic_stack,
    trees: topic_trees,
    graphs: topic_graphs,
    dp: topic_dp,
    heap_trie: topic_heap_trie,
    backtracking: topic_backtracking,

    // System Design Topics
    systemdesign_scaling_reads: topic_systemdesign_scaling_reads,
    systemdesign_scaling_writes: topic_systemdesign_scaling_writes,
    systemdesign_realtime_updates: topic_systemdesign_realtime_updates,
    systemdesign_dealing_with_contention: topic_systemdesign_dealing_with_contention,
    systemdesign_multi_step_processes: topic_systemdesign_multi_step_processes,
    systemdesign_handling_large_blobs: topic_systemdesign_handling_large_blobs,
    systemdesign_long_running_tasks: topic_systemdesign_long_running_tasks,

    // Concept Guides
    dp_concepts: topic_dp_concepts,
    arrays_concepts: topic_arrays_concepts,
    graphs_concepts: topic_graphs_concepts,
    trees_concepts: topic_trees_concepts,
    complexity_concepts: topic_complexity_concepts,
    stack_concepts: topic_stack_concepts,
    backtracking_concepts: topic_backtracking_concepts
};

