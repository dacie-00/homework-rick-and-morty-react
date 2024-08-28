import { createFileRoute } from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3 className={"text-red-500"}>Welcome Home!</h3>
            <Button>Press me!!</Button>
        </div>
    )
}
