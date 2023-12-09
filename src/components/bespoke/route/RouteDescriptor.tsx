import Typography from "@/components/typography/Typography"
import { capitalizeFirstLetter } from "@/lib/utils"
import { AllIncludeRoute } from "@/types/bespoke-components"

interface RouteDescriptorProps {
  route: AllIncludeRoute
}

/**
 *
 */
export default async function RouteDescriptor(props: RouteDescriptorProps) {
  if (!props.route) {
    return null
  }

  return (
    <div>
      <Typography variants="h1" colorLevel={12}>
        {capitalizeFirstLetter(props.route.title)}
      </Typography>
      <p>
        <Typography variants="subtitle1" colorLevel={11}>
          {props.route.description}
        </Typography>
      </p>
    </div>
  )
}
