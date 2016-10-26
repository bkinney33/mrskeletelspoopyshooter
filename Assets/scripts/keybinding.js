function handleKeyDown(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        if (!LEFT_DOWN) {
            LEFT_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_RIGHT:
        if (!RIGHT_DOWN) {
            RIGHT_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_UP:
        if (!UP_DOWN) {
            UP_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_DOWN:
        if (!DOWN_DOWN) {
            DOWN_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_W:
        if (!W_DOWN) {
            W_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_A:
        if (!A_DOWN) {
            A_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_S:
        if (!S_DOWN) {
            S_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_D:
        if (!D_DOWN) {
            D_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_M:
        if (!M_DOWN) {
            M_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_J:
        if (!J_DOWN) {
            J_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_SPACE:
        if (!SPACE_DOWN) {
            SPACE_DOWN = true;
            //            console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_ESC:
        if (!ESC_DOWN) {
            ESC_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    case KEYCODE_L_SHIFT:
        if (!L_SHIFT_DOWN) {
            L_SHIFT_DOWN = true;
            //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") down");
        }
        return false;
    }
}

function handleKeyUp(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        LEFT_DOWN = false;
        break;
    case KEYCODE_RIGHT:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        RIGHT_DOWN = false;
        break;
    case KEYCODE_UP:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        UP_DOWN = false;
        break;
    case KEYCODE_DOWN:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        DOWN_DOWN = false;
        break;
    case KEYCODE_W:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        W_DOWN = false;
        return false;
    case KEYCODE_A:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        A_DOWN = false;
        return false;
    case KEYCODE_S:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        S_DOWN = false;
        return false;
    case KEYCODE_D:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        D_DOWN = false;
        return false;
    case KEYCODE_M:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        M_DOWN = false;
        return false;
    case KEYCODE_J:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        J_DOWN = false;
        return false;
    case KEYCODE_SPACE:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        SPACE_DOWN = false;
        return false;
    case KEYCODE_ESC:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        ESC_DOWN = false;
        return false;
    case KEYCODE_L_SHIFT:
        //console.log(Keys[evt.keyCode] + " (" + evt.keyCode + ") up");
        L_SHIFT_DOWN = false;
        return false;
    }
}

function bindKeys() {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}