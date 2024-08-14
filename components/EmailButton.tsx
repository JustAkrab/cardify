import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Subscribe() {
  return (
    <div className="flex w-full max-w-md items-center space-x-2 mt-12 mx-auto">
      <Input type="email" placeholder="Your email address" />
      <Button type="submit">Subscribe</Button>
    </div>
  )
}
