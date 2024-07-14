"use client";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const disabled = props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />

        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full py-2 hover:bg-transparent'
          onClick={() => setShowPassword(prev => !prev)}
        // disabled={disabled}
        >
          {showPassword ? (
            <EyeIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>


        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInputsss"

export default PasswordInput;