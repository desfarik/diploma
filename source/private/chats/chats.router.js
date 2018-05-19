import template from "./chats.html"
import chatsController from "./chats.controller";

export default function ChatsRouter($stateProvider) {
    return $stateProvider.state({
        name: 'chats',
        url: '/chats',
        template,
        controller: chatsController,
        controllerAs: "chat",
        bindToController: true,
        params:{
            userId: null
        }
    })
}