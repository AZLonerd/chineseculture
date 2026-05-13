import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
const Searchbar = () => {
    return (
        <Field>
            <ButtonGroup>
                <Input id="input-button-group" placeholder="Type to search..." />
                <Button variant="outline">Search</Button>
            </ButtonGroup>
        </Field>
    )
}

export default Searchbar
