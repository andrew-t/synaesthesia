# synaesthesia
Quickly and visually compare arbitrary hex in streams

`synaesthesia` (with the British spelling) takes an input stream and adds colouring to any strings of hex it detects. It is designed to allow you to compare hashes and the like at a glance.

Examples:

    md5 download.zip | synaesthesia
    openssl rsa -noout -modulus < cert.key | synaesthesia

It uses a deterministic algorithm to assign colours so you can run it on the same hash on different computers and it should still work.

## Options

On OSX at least, `--emoji` or `-e` replaces the colourised text with a selection of emoji chosen to be fairly distinct from each other (ie, only one smiley face; only one snowman).
