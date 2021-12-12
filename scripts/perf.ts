import { flagParser } from "./flagParser"

const main = () => {
    const flags = flagParser();
    console.log(flags.target)
}

main()