(
    function (){
        let len = document.getElementById("len")
        let wid = document.getElementById("wid")
        let outPerimeter = document.getElementById("perimeter")
        let outArea= document.getElementById("area")
        let outDiag = document.getElementById("diag")
        const err = document.getElementById('rectError');

        function calculate(){
            err.textContent=''
            const length = parseFloat(len.value)
            const width  = parseFloat(wid.value)

            if (Number.isNaN(length) || Number.isNaN(width)){
                outPerimeter.textContent = outArea.textContent = outDiag.textContent = "—"
                return;
            }

            if (length<=0||width<=0){
                err.textContent = "Помилка. Довжина і ширина мають бути більшими за 0"
                return
            }

            const perimeter = 2 * (length + width)
            const area = length * width;
            const diagonal = Math.sqrt(length*length + width*width)

            outPerimeter.textContent=perimeter.toFixed(4)
            outArea.textContent=area.toFixed(4)
            outDiag.textContent=diagonal.toFixed(4)
        }

        len.addEventListener('input', calculate)
        wid.addEventListener('input', calculate)
    }
)();

(
    function (){
        let stream = document.getElementById("stream")
        let u1t = document.getElementById("u1text")
        let u2t = document.getElementById("u2text")
        let u1out = document.getElementById("u1send")
        let u2out = document.getElementById("u2send")

        function sendMessage(side, text){
            const message = text.trim();
            if (!message)
                return;

            const wrap = document.createElement("div")
            wrap.className = "bubble " + (side === "right" ? "right" : "left")

            const from = document.createElement("div")
            from.className = "from"
            from.textContent = side === "right" ? "USER2" : "USER1"

            const body = document.createElement('div');
            body.textContent = message;

            wrap.append(from, body)
            stream.appendChild(wrap)
            stream.scrollTop = stream.scrollHeight
        }

        u1out.addEventListener("click", () => {
            sendMessage("left", u1t.value)
            u1t.value = ""
            u1t.focus()
        })

        u2out.addEventListener("click", () => {
            sendMessage("right", u2t.value)
            u2t.value = ""
            u2t.focus()
        })

        u1t.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                u1out.click();
            }
        });

        u2t.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                u2out.click();
            }
        });
    }
)();

(
    function (){
        const src = document.getElementById("ua")
        const dst = document.getElementById("la")

        const lower = {
            'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y',
            'і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
            'у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ю':'iu','я':'ia',
            'ь':'','ʼ':'','’':'','\'':''
        };


        //замість звичайного foreach
        /*const upper = {};
          for (const k in base) {
          const v = base[k];
          upper[k.toUpperCase()] = v ? v[0].toUpperCase() + v.slice(1) : v;
          }*/
        const upper = Object.fromEntries(
            Object.entries(lower).map(
                ([key, value]) =>
                    [key.toUpperCase(), value ? value[0].toUpperCase() + value.slice(1) : value]
            )
        )
        console.log(upper)

        const startMap = { 'є':'ye','ї':'yi','й':'y','ю':'yu','я':'ya' };


        function isCyrillic(char){
            return /[А-Яа-яЄєЇїЙйҐґ]/.test(char)
        }

        function isAposOrHyphen(ch){
            return ch === '’' || ch === 'ʼ' || ch === "'" || ch === '-'
        }

        function isUpperCase(char){
            return char === char.toUpperCase() && char !== char.toLowerCase()
        }

        function capitalize(s){
            return s ? s[0].toUpperCase() + s.slice(1) : s;
        }

        function transliterate(text){
            const out = []

            for (let i = 0; i < text.length; i++){
                const char = text[i]

                const prev = i > 0 ? text[i-1] : ""
                const atWordStart = (i === 0) || (!isCyrillic(prev) && !isAposOrHyphen(prev))

                const lowerCh = char.toLowerCase()
                if (atWordStart && startMap[lowerCh] !== undefined){
                    const rep = isUpperCase(char) ? capitalize(startMap[lowerCh]) : startMap[lowerCh];
                    out.push(rep);
                    continue;
                }

                if (lower[char] !== undefined){
                    out.push(lower[char])
                    continue
                }

                if (upper[char] !== undefined){
                    out.push(upper[char])
                    continue
                }
                out.push(char)
            }
            return out.join('')
        }

        function updateTransliteration() {
            dst.value = transliterate(src.value);
        }

       src.addEventListener("input", updateTransliteration)
        updateTransliteration()
    }
)();

