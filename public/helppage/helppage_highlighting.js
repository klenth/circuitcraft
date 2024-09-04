"use strict";

(function() {
    var highlightRegexes = {
        "java": {
            //"block-comment": /\/\*[\s\S]*?!(\*\/)\*\//mg,
            "block-comment": /\/\*[\s\S]*?\*\//mg,
            "line-comment": /\/\/[^\n\r$]*[\n\r$]/g,
            "string": /"((\\")|([^"]))*"/g,
            "type": /\b((byte)|(short)|(int)|(long)|(float)|(double)|(char)|(boolean))\b/g,
            "keyword": /\b((abstract)|(assert)|(break)|(case)|(catch)|(class)|(const)|(continue)|(default)|(do)|(else)|(enum)|(extends)|(final)|(finally)|(for)|(goto)|(if)|(implements)|(import)|(instanceof)|(interface)|(native)|(new)|(package)|(private)|(protected)|(public)|(return)|(static)|(strictfp)|(super)|(switch)|(synchronized)|(this)|(throw)|(throws)|(transient)|(try)|(void)|(volatile)|(while))\b/g,
            "number": /\b[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))([eE]([\+\-]?)\d+)?\b/g,
        },
 
        "C": {
            //"block-comment": /\/\*[\s\S]*?!(\*\/)\*\//mg,
            "block-comment": /\/\*[\s\S]*?\*\//mg,
            "line-comment": /\/\/[^\n\r$]*([\n\r]|$)/g,
            "string": /"((\\")|([^"]))*"/g,
            "type": /\b((char)|(short)|(int)|(long)|(float)|(double)|(char)|(signed)|(unsigned))\b/g,
            "keyword": /\b(__attribute__|(break)|(case)|(const)|(continue)|(default)|(do)|(else)|(enum)|(for)|(goto)|(if)|inline|(return)|(sizeof)|(static)|struct|(switch)|(typedef)|(void)|(while)|(#include)|(#define))\b/g,
            "number": /\b[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))([eE]([\+\-]?)\d+)?\b/g,
        },
 
        // Note: written offline without Python reference (incomplete!)
        "python": {
            "line-comment": /#[^\n\r$]*[\n\r$]/g,
            "string": /("((\\")|([^"]))*")|('((\\')|([^']))*')/g,
            "type": /\b((int)|(float)|(bool)|(str)|(list)|(set)|(dict))\b/g,
            "keyword": /\b((class)|(def)|(for)|(from)|(if)|(import)|(return)|(self))\b/g,
            "number": /\b[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))([eE]([\+\-]?)\d+)?\b/g
        },
 
        "arm": {
            "line-comment": /;[^\n\r$]*[\n\r$]/g,
            "number": /#((0[xX][0-9a-fA-F]+)|(\-?\d+))/g,
            "keyword": /\b(DCD|(MOV)|(CMP)|(BLE)|LDR|(LSL)|ADD|ADDGT|ADDLE|B|BX|SUB|SUBGT|SUBLE)\b/g,
            "string": /\b([Rr](0|1|2|3|4|5|6|7|8|9|(10)|(11)|(12)|(13)|(14)|(15)))|((SP)|(LR)|(PC))\b/g
        },

        "arm32": {
            "line-comment": /;.*[\r\n$]/g,
            keyword: /\b(?:nop|(?:add|adc|sub|sbc|rsb|rsc|mov|mvn|and|eor|orr|bic|asl|lsl|asr|lsr|ror|mul|mla)(s?(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?|(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?s?)|(tst|teq|cmp|cmn|b|bl|bx|stop|break|mov|swi)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?|ldrb?(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?b?|strb?(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?|(?:ldm|stm)(?:ia|ib|da|db|fd|ed|fa|ea)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?)\b/gi,
            register: /\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15|sp|lr|pc)\b/gi,
            number: /[#=]-?0x[A-F0-9_]+|[#=]-?0b[01_]+|[#=]-?[0-9_]+/gi,
            string: /'([^']|\.)*'|"([^"]|\.)*"/g,
            directive: /(dcd|dcb|equ|fill|align)/gi,
            symbol: /\.[A-Z0-9_]+/gi,
        },
 
        "armv8": {
            "line-comment": /\/\/[^\n\r$]*[\n\r$]/g,
            "number": /#((0[xX][0-9a-fA-F]+)|(\-?\d+))/g,
            "keyword": /\b(LDUR|STUR|ADD|ADDI|ADDS|ADDIS|SUB|SUBI|SUBS|SUBIS|AND|ANDI|ANDS|ANDIS|ORR|ORRI|ORRS|ORRIS|EOR|EORI|EORS|EORIS|LSL|LSR|CBZ|CBNZ|B|B.EQ|B.NE|B.LT|B.GT|B.LE|B.GE|B.LO|B.LS|B.HI|B.HS|B.MI|B.PL|B.VS|B.VC)\b/g,
            //"string": /\b([Xx]([12]?[0-9])|30|31)\b/g
            //"string": /^[a-zA-Z0-9_]+\:/mg,
        },

        // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar
        "javascript": {
            "block-comment": /\/\*[\s\S]*?\*\//mg,
            "line-comment": /\/\/[^\n\r$]*[\n\r$]/g,
            "string": /("((\\")|([^"]))*")|('((\\')|([^']))*')/g,
            "keyword": /\b(await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|function|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|static|super|switch|this|throw|true|try|typeof|undefined|var|void|while|with|yield)\b/g,
            "number": /\b[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))([eE]([\+\-]?)\d+)?\b/g,
        },
 
 
        // Incomplete:
        "SQL": {
            "line-comment": /--\s+[^\n\r$]*[\n\r$]/g,
            "number": /\b[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))([eE]([\+\-]?)\d+)?\b/g,
            "keyword": /\b((ALL)|(AFTER)|(ALTER)|(AND)|(ANY)|(AS)|(ASC)|(AT)|(AUTO_INCREMENT)|(AVG)|(BEGIN)|(BETWEEN)|(BIGINT)|(BINARY)|(BLOB)|(BOOL)|(BOOLEAN)|(BY)|(BYTE)|(CASCADE)|(CASE)|(CHAR)|(CHARACTER)|(COALESCE)|(COLUMN)|(COLUMNS)|(COMMIT)|(CONSTRAINT)|(CONTAINS)|(DATE)|(DATETIME)|(DECIMAL)|(DEFAULT)|(DELETE)|(DESC)|(DESCRIBE)|(DROP)|(EXISTS)|(FOREIGN)|FROM|(IF)|(IN)|INNER|JOIN|(KEY)|(LIKE)|(NULL)|(ON)|(ORDER)|(SELECT)|(SET)|(TABLE)|(UNION)|UPDATE|(WHERE))\b/g,
            "string": /("((\\")|([^"]))*")|('((\\')|([^']))*')/g,
        }
    };
    
    function highlight(region) {
        let lang = region.dataset.language || "arm32";
        if (lang in highlightRegexes) {
            let regexes = highlightRegexes[lang];
            Object.keys(regexes).forEach(function(clazz) {
                highlightRegex(region, clazz, regexes[clazz]);
            });
        } else
            console.warn("Unknown highlight language: " + lang);
    }
    
    function highlightRegex(region, clazz, regex) {
        for (let i = 0; i < region.childNodes.length; ++i) {
            let node = region.childNodes[i];
            if (node.nodeType === HTMLElement.TEXT_NODE) {
                let text = node.textContent;
                let matches = matchRegexAll(text, regex);
                
                if (matches.length > 0) {
                    let nodesAdded = applyMatches(region, i, clazz, matches);
                    i += nodesAdded;
                }
            }
        }
    }
    
    function matchRegexAll(text, regex) {
        let matches = [];
        let m;
        do {
            m = regex.exec(text);
            if (m)
                matches.push([m.index, m[0].length]);
        } while (m);
        
        return matches;
    }
    
    function applyMatches(region, textNodeIndex, clazz, matches) {
        let lastMatch = matches[matches.length - 1];
        let matchIndex = lastMatch[0],
            matchLength = lastMatch[1];
        let newNodes = 0;
        let span = document.createElement("span");
        span.classList.add(clazz);
        let textNode = region.childNodes[textNodeIndex];
        span.innerText = textNode.textContent.substring(matchIndex, matchIndex + matchLength);
        region.insertBefore(span, region.childNodes[textNodeIndex + 1]);
        ++newNodes;
        
        // Is there any text after this match that we need to preserve?
        if (textNode.textContent.length > matchIndex + matchLength) {
            let endingText = textNode.textContent.substring(matchIndex + matchLength);
            let newTextNode = document.createTextNode(endingText);
            region.insertBefore(newTextNode, region.childNodes[textNodeIndex + 2]);
            ++newNodes;
        }
        
        textNode.textContent = textNode.textContent.substring(0, matchIndex);
        
        if (matches.length > 1)
            return newNodes + applyMatches(region, textNodeIndex, clazz, matches.slice(0, -1));        
        else
            return newNodes;
    }
    
    let highlightRegions = document.querySelectorAll(".highlight");
    highlightRegions.forEach(function(r) { highlight(r); });
})();
