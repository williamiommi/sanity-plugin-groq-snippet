import {SVGProps} from 'react'

interface FullCheckboxProps extends SVGProps<SVGSVGElement> {}

const FullCheckbox = ({width, height, ...rest}: FullCheckboxProps) => {
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
          d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25ZM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25Zm12.78 3.03a.75.75 0 1 0-1.06-1.06l-6.223 6.216L7.78 12.22a.75.75 0 0 0-1.06 1.06l2.745 2.746a.75.75 0 0 0 1.06 0l6.754-6.745Z"
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
          d="M20 12a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.822 9.822 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10M7.91 10.08L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17l-3.09-3.09Z"
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
          d="M14 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8h-2c0 3.32-2.68 6-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6c.43 0 .86.05 1.27.14l1.61-1.6C15.96 2.18 15 2 14 2m6.59 1.58L14 10.17l-2.38-2.38l-1.41 1.42L14 13l8-8m-17.07.82A8.01 8.01 0 0 0 2 12a8 8 0 0 0 8 8c.64 0 1.27-.08 1.88-.23c-1.76-.39-3.38-1.27-4.71-2.48A6.001 6.001 0 0 1 4 12c0-.3.03-.59.07-.89C4.03 10.74 4 10.37 4 10c0-1.44.32-2.87.93-4.18Z"
        />
      </svg> */}
    </>
  )
}

export default FullCheckbox
