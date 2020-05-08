import { flagParser } from "./flagParser"
import { context } from "@actions/github"

const main = () => {
    const flags = flagParser();
    console.log(flags.target)
    console.log(context?.payload?.pull_request?.head.ref)
}

main()