import {SVGProps} from 'react'

interface EmptyCheckboxProps extends SVGProps<SVGSVGElement> {}

const EmptyCheckbox = ({width, height, ...rest}: EmptyCheckboxProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        {...rest}
      >
        <path
          fill="currentColor"
          d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25ZM6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75V6.25a1.75 1.75 0 0 0-1.75-1.75H6.25Z"
        />
      </svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        {...rest}
      >
        <path
          fill="currentColor"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        {...rest}
      >
        <path
          fill="currentColor"
          d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m0 2c3.32 0 6 2.69 6 6c0 3.32-2.68 6-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6M4.93 5.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6.001 6.001 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18Z"
        />
      </svg> */}
    </>
  )
}

export default EmptyCheckbox
