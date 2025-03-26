class Letras {
    constructor() {
        this.russo = [
            // Vogais
            { char: "А", unicode: "\u0410", html: "&#1040;", pronunciation: "A" },
            { char: "Е", unicode: "\u0415", html: "&#1045;", pronunciation: "Iê" },
            { char: "Ё", unicode: "\u0401", html: "&#1025;", pronunciation: "Iô" },
            { char: "И", unicode: "\u0418", html: "&#1048;", pronunciation: "I" },
            { char: "Й", unicode: "\u0419", html: "&#1049;", pronunciation: "I curto (como 'y' em 'yes')" },
            { char: "О", unicode: "\u041E", html: "&#1054;", pronunciation: "Ô" },
            { char: "У", unicode: "\u0423", html: "&#1059;", pronunciation: "U" },
            { char: "Э", unicode: "\u042D", html: "&#1069;", pronunciation: "É" },
            { char: "Ю", unicode: "\u042E", html: "&#1070;", pronunciation: "Iú" },
            { char: "Я", unicode: "\u042F", html: "&#1071;", pronunciation: "Iá" },
          
            // Consoantes
            { char: "Б", unicode: "\u0411", html: "&#1041;", pronunciation: "Bê" },
            { char: "В", unicode: "\u0412", html: "&#1042;", pronunciation: "Vê" },
            { char: "Г", unicode: "\u0413", html: "&#1043;", pronunciation: "Guê" },
            { char: "Д", unicode: "\u0414", html: "&#1044;", pronunciation: "Dê" },
            { char: "Ж", unicode: "\u0416", html: "&#1046;", pronunciation: "Jê (como 'j' em francês)" },
            { char: "З", unicode: "\u0417", html: "&#1047;", pronunciation: "Zê" },
            { char: "К", unicode: "\u041A", html: "&#1050;", pronunciation: "Ká" },
            { char: "Л", unicode: "\u041B", html: "&#1051;", pronunciation: "L" },
            { char: "М", unicode: "\u041C", html: "&#1052;", pronunciation: "M" },
            { char: "Н", unicode: "\u041D", html: "&#1053;", pronunciation: "N" },
            { char: "П", unicode: "\u041F", html: "&#1055;", pronunciation: "Pê" },
            { char: "Р", unicode: "\u0420", html: "&#1056;", pronunciation: "R forte (como em 'carro')" },
            { char: "С", unicode: "\u0421", html: "&#1057;", pronunciation: "S" },
            { char: "Т", unicode: "\u0422", html: "&#1058;", pronunciation: "T" },
            { char: "Ф", unicode: "\u0424", html: "&#1060;", pronunciation: "Fê" },
            { char: "Х", unicode: "\u0425", html: "&#1061;", pronunciation: "R aspirado (como 'j' em espanhol)" },
            { char: "Ц", unicode: "\u0426", html: "&#1062;", pronunciation: "Tsê" },
            { char: "Ч", unicode: "\u0427", html: "&#1063;", pronunciation: "Tchê" },
            { char: "Ш", unicode: "\u0428", html: "&#1064;", pronunciation: "Xá" },
            { char: "Щ", unicode: "\u0429", html: "&#1065;", pronunciation: "Xchá (mais longo que Ш)" },
          
            // Outros
            { char: "Ъ", unicode: "\u042A", html: "&#1066;", pronunciation: "Sinal duro (não tem som próprio)" },
            { char: "Ы", unicode: "\u042B", html: "&#1067;", pronunciation: "Som entre 'i' e 'u'" },
            { char: "Ь", unicode: "\u042C", html: "&#1068;", pronunciation: "Sinal suave (amolece a consoante)" },
            { char: "Э", unicode: "\u044D", html: "&#1069;", pronunciation: "É" },
            { char: "Ю", unicode: "\u044E", html: "&#1102;", pronunciation: "Iú" },
            { char: "Я", unicode: "\u044F", html: "&#1103;", pronunciation: "Iá" },
          ]
        this.japones = [
            // Hiragana
            { char: "あ", unicode: "\u3042", html: "&#12354;", pronunciation: "a" },
            { char: "い", unicode: "\u3044", html: "&#12356;", pronunciation: "i" },
            { char: "う", unicode: "\u3046", html: "&#12358;", pronunciation: "u" },
            { char: "え", unicode: "\u3048", html: "&#12360;", pronunciation: "e" },
            { char: "お", unicode: "\u304A", html: "&#12362;", pronunciation: "o" },
            { char: "か", unicode: "\u304B", html: "&#12363;", pronunciation: "ka" },
            { char: "き", unicode: "\u304D", html: "&#12365;", pronunciation: "ki" },
            { char: "く", unicode: "\u304F", html: "&#12367;", pronunciation: "ku" },
            { char: "け", unicode: "\u3051", html: "&#12369;", pronunciation: "ke" },
            { char: "こ", unicode: "\u3053", html: "&#12371;", pronunciation: "ko" },
            { char: "さ", unicode: "\u3055", html: "&#12373;", pronunciation: "sa" },
            { char: "し", unicode: "\u3057", html: "&#12375;", pronunciation: "shi" },
            { char: "す", unicode: "\u3059", html: "&#12377;", pronunciation: "su" },
            { char: "せ", unicode: "\u305B", html: "&#12379;", pronunciation: "se" },
            { char: "そ", unicode: "\u305D", html: "&#12381;", pronunciation: "so" },

            // Katakana
            { char: "ア", unicode: "\u30A2", html: "&#12450;", pronunciation: "a" },
            { char: "イ", unicode: "\u30A4", html: "&#12452;", pronunciation: "i" },
            { char: "ウ", unicode: "\u30A6", html: "&#12454;", pronunciation: "u" },
            { char: "エ", unicode: "\u30A8", html: "&#12456;", pronunciation: "e" },
            { char: "オ", unicode: "\u30AA", html: "&#12458;", pronunciation: "o" },
            { char: "カ", unicode: "\u30AB", html: "&#12459;", pronunciation: "ka" },
            { char: "キ", unicode: "\u30AD", html: "&#12461;", pronunciation: "ki" },
            { char: "ク", unicode: "\u30AF", html: "&#12463;", pronunciation: "ku" },
            { char: "ケ", unicode: "\u30B1", html: "&#12465;", pronunciation: "ke" },
            { char: "コ", unicode: "\u30B3", html: "&#12467;", pronunciation: "ko" },
            { char: "サ", unicode: "\u30B5", html: "&#12469;", pronunciation: "sa" },
            { char: "シ", unicode: "\u30B7", html: "&#12471;", pronunciation: "shi" },
            { char: "ス", unicode: "\u30B9", html: "&#12473;", pronunciation: "su" },
            { char: "セ", unicode: "\u30BB", html: "&#12475;", pronunciation: "se" },
            { char: "ソ", unicode: "\u30BD", html: "&#12477;", pronunciation: "so" }
        ]
        this.coreano = [
            // Vogais
            { char: "ㅏ", unicode: "\u314F", html: "&#12623;", pronunciation: "a" },
            { char: "ㅑ", unicode: "\u3151", html: "&#12625;", pronunciation: "ya" },
            { char: "ㅓ", unicode: "\u3153", html: "&#12627;", pronunciation: "eo (ó aberto)" },
            { char: "ㅕ", unicode: "\u3155", html: "&#12629;", pronunciation: "yeo (yó aberto)" },
            { char: "ㅗ", unicode: "\u3157", html: "&#12631;", pronunciation: "o" },
            { char: "ㅛ", unicode: "\u315B", html: "&#12635;", pronunciation: "yo" },
            { char: "ㅜ", unicode: "\u315C", html: "&#12636;", pronunciation: "u" },
            { char: "ㅠ", unicode: "\u3160", html: "&#12640;", pronunciation: "yu" },
            { char: "ㅡ", unicode: "\u3161", html: "&#12641;", pronunciation: "eu (som entre 'u' e 'i')" },
            { char: "ㅣ", unicode: "\u3163", html: "&#12643;", pronunciation: "i" },
          
            // Consoantes
            { char: "ㄱ", unicode: "\u3131", html: "&#12593;", pronunciation: "g/k (k leve)" },
            { char: "ㄴ", unicode: "\u3134", html: "&#12596;", pronunciation: "n" },
            { char: "ㄷ", unicode: "\u3137", html: "&#12599;", pronunciation: "d/t (t leve)" },
            { char: "ㄹ", unicode: "\u3139", html: "&#12601;", pronunciation: "r/l (língua batendo no céu da boca)" },
            { char: "ㅁ", unicode: "\u3141", html: "&#12609;", pronunciation: "m" },
            { char: "ㅂ", unicode: "\u3142", html: "&#12610;", pronunciation: "b/p (p leve)" },
            { char: "ㅅ", unicode: "\u3145", html: "&#12613;", pronunciation: "s" },
            { char: "ㅇ", unicode: "\u3147", html: "&#12615;", pronunciation: "ng (ou muda no início da sílaba)" },
            { char: "ㅈ", unicode: "\u3148", html: "&#12616;", pronunciation: "j/tch" },
            { char: "ㅊ", unicode: "\u314A", html: "&#12618;", pronunciation: "ch" },
            { char: "ㅋ", unicode: "\u314B", html: "&#12619;", pronunciation: "k forte" },
            { char: "ㅌ", unicode: "\u314C", html: "&#12620;", pronunciation: "t forte" },
            { char: "ㅍ", unicode: "\u314D", html: "&#12621;", pronunciation: "p forte" },
            { char: "ㅎ", unicode: "\u314E", html: "&#12622;", pronunciation: "h" }
          ]
    }
}

  