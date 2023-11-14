import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    // ExecutionContext is a wrapper of incoming Request
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.currentUser
    }
)