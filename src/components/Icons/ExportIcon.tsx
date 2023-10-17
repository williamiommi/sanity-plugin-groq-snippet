import {SVGProps} from 'react'

interface ExportIconProps extends SVGProps<SVGSVGElement> {}

const ExportIcon = (props: ExportIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3s-3.582-3-8-3s-8 1.343-8 3" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183-.086 3.15-.241M20 12V6" />
        <path d="M4 12v6c0 1.657 3.582 3 8 3c.157 0 .312-.002.466-.005M16 19h6m-3-3l3 3l-3 3" />
      </g>
    </svg>
  )
}

export default ExportIcon
