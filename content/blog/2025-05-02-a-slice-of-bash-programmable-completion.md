---
title: A slice of Bash programmable completion
extra:
  ciemmwue: in Beijing
  iiia: 1
---

During the process of migrating a Conda environment and mitigating confliction, I noticed Bash programmable completion was experiencing an issue when the environment was not yet incomplete. I seemingly showed no curiousity, proceeding to enter the command despite STDERR for the rest of migration. This post was created after that since there are no Marginalia search engine-style sources on Bash programmable completion.<!--more-->

Context-dependent completion is easy to spot. Git, the first instance coming to my mind, completes options and hash strings when you are hasty writing down an arbitrary hexadecimal ID. For [practical scripts](https://stackoverflow.com/questions/20838284/how-can-i-provide-tab-completions-to-fish-shell-from-my-own-script), completion functions serve as a valuable aid in recalling details of commands.

The builtin command `complete` determines how arguments are to be completed by Readline. In the absence of arguments, it outputs available completion functions in a ready-to-load format. To relate a function to a command, use
```bash
complete -F <completion_function> <command>
```

Here is an example of completion function:
```bash
_mycmd_completion() {
    # retrieve words on the current line
    local cur prev
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"

    # complete according to the previous word
    case "$prev" in
        mycmd)
            COMPREPLY=( $(compgen -W "start stop" -- "$cur") )
            ;;
        *)
            COMPREPLY=()
            ;;
    esac
}
# enable the completion function
complete -F _mycmd_completion mycmd
```

The function retrieves precedent words from variables. The current line, `COMP_LINE` is split into words in `COMP_WORDS`. In the function, the target is the last word indexed as `COMP_CWORD`. Use `COMP_LINE` for the word being edited.

`compgen` is another builtin function that generates completions, intended to be used in a completion function. The options of `compgen` denote the type and lexical criteria of completion, as exemplified in the table:

| Example | Usage |
|-|-|
| `compgen -f test` | List all **filenames** starting with *test*   |
| `compgen -d test` | List all **directories** starting with *test* |
| `compgen -c git`  | List all **commands** starting with *git*     |
| `compgen -W`<wbr> `"john jane joan jojo"`<wbr> `-- jo` | List **words** from the word list starting with 'jo' |
| `compgen -W`<wbr> `"john jane"`<wbr> `-P "cmd:" -S "!"` | Adding uniform **prefixes** and **suffixes** |

Therefore, the expression above completes *start* and/or *stop* according to the partially typed word. You can also pipe `compgen` output to `grep` to further filter the results.

In the end, the completion function is attached to a command.

For Python scripts, packages like `shtab`, `argcomplete`, and `prompt_toolkit` are responsible for completions. `click`, an alternative to builtin argument parsing library `argparse`, is a versatile tool supporting completion.

Using `compgen` and `complete` in Bash, you may create completion rules for filenames, commands, options, and more. Custom completion allows you to enhance the usability of command-line tools and scripts. Fish offers [more nuanced completion generators](https://fishshell.com/docs/current/completions.html#writing-your-own-completions) invoked in a similar procedure; you may read the super-friendly documentation.
