import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  openBlock,
  createElementBlock,
  renderSlot,
  getCurrentInstance,
  onBeforeUnmount,
  normalizeStyle,
  watchEffect,
  nextTick,
  shallowRef,
  useSlots,
  createCommentVNode,
} from "vue";
const YikFocus = {
  mounted(el) {
    if (el.nodeName == "INPUT") {
      el.focus();
    }
    if (el.nodeName != "INPUT") {
      console.error("你不应该把指令用在" + el.nodeName + "标签上");
    }
  },
};
const YikPower = {
  mounted(el, binding) {
    const modifiers = binding.modifiers;
    const { values, value, callback } = binding.value;
    let count = 0;
    values.forEach((item) => {
      if (item == value) {
        count++;
      }
    });
    if (count == 0) {
      if (modifiers["v-show"]) {
        el.style.display = "none";
      } else if (modifiers["v-if"]) {
        el.remove();
      } else {
        el.remove();
      }
    }
    if (callback) callback(count);
  },
};
function parentNode(el) {
  const style = document.defaultView.getComputedStyle(el);
  if (style["overflow-y"] == "auto" || style["overflow"] == "auto") {
    return el;
  } else {
    return parentNode(el.parentNode);
  }
}
const YikLazy = {
  mounted(el, binding, vNode) {
    const _parentNode = parentNode(el.parentNode);
    const { arg, value, modifiers } = binding;
    const { height } = el.parentNode.getBoundingClientRect();
    _parentNode.addEventListener("scroll", function () {
      const { top } = el.getBoundingClientRect();
      if (modifiers.comp) {
        if (height > top) {
          vNode.ctx.props[arg] = value;
        }
      } else {
        if (height > top) {
          el[arg ? arg : "src"] = value;
        }
      }
    });
  },
};
class Scroll {
  /**
   * @description:
   * @param {*} el  dom 元素
   * @param {*} watchTop 置顶时，回调
   * @param {*} watchBottom 最低时， 回调
   * @param {*} watch  滚动时，回调 top,height,direction,el
   * @return {*}
   */
  constructor({ el, watchTop, watchBottom, watch: watch2 }) {
    this._el = el;
    this._watchTop = watchTop;
    this._watchBottom = watchBottom;
    this._watch = watch2;
    this._direction = "";
    this.listening();
  }
  listening() {
    this._el.style["scroll-behavior"] = "smooth";
    let beforeScrollTop = this._el.scrollTop;
    this._el.addEventListener("scroll", (e) => {
      let delta = this._el.scrollTop - beforeScrollTop;
      delta >= 0 ? (this._direction = "down") : (this._direction = "up");
      beforeScrollTop = this._el.scrollTop;
      let height = this._el.scrollHeight - this._el.clientHeight;
      if (this._watch)
        this._watch({
          top: this._el.scrollTop,
          height,
          direction: this._direction,
          el: this._el,
        });
      if (this._el.scrollTop <= 0 && this._watchTop) {
        this._watchTop();
      }
      if (this._el.scrollTop >= height && this._watchBottom) {
        this._watchBottom();
      }
    });
  }
  // 设置滚动条值
  setTop(val) {
    if (typeof val == "number") {
      this._el.scrollTop = val;
    } else {
      throw new Error("setTop 形参必须是Number类型");
    }
  }
}
const _sfc_main$4 = {
  __name: "index",
  props: {
    scroll: {
      type: Number,
      default: 0,
    },
  },
  emits: ["onBottom", "onTop", "onWatch"],
  setup(__props, { emit }) {
    const props = __props;
    const yikUiPageRef = ref(null);
    let scroll = null;
    watch(
      () => props.scroll,
      (value) => {
        scroll.setTop(value);
      }
    );
    onMounted(() => {
      yikUiPageRef.value.style["overflow-y"] = "auto";
      scroll = new Scroll({
        el: yikUiPageRef.value,
        watchBottom: () => {
          emit("onBottom");
        },
        watchTop: () => {
          emit("onTop");
        },
        watch: (data) => {
          emit("onWatch", data);
        },
      });
      scroll.setTop(props.scroll);
      watch(
        () => props.scroll.value,
        (val) => {
          scroll.setTop(val);
        }
      );
    });
    onUnmounted(() => {
      if (scroll) scroll = null;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "yik-ui-page",
            ref_key: "yikUiPageRef",
            ref: yikUiPageRef,
          },
          [
            renderSlot(_ctx.$slots, "default"),
            renderSlot(_ctx.$slots, "loading"),
          ],
          512
        )
      );
    };
  },
};
const _sfc_main$3 = {
  __name: "index",
  props: {
    width: {
      type: String,
      default: "1920px",
    },
    height: {
      type: String,
      default: "1080px",
    },
    isCover: {
      type: Boolean,
      default: false,
    },
  },
  setup(__props) {
    const props = __props;
    const maxView = ref(null);
    let timeout = null;
    const that = getCurrentInstance();
    const zoomView = () => {
      const parentNode2 = that.refs.maxView.parentNode;
      let view = maxView.value,
        viewWidth = parseInt(view.style.width),
        viewHeight = parseInt(view.style.height);
      if (props.isCover) {
        parentNode2.style.width = window.innerWidth + "px";
        parentNode2.style.height = window.innerHeight + "px";
        parentNode2.style.display = "flex";
        parentNode2.style.justifyContent = "center";
        const scale =
          window.innerWidth / window.innerHeight < viewWidth / viewHeight
            ? window.innerWidth / viewWidth
            : window.innerHeight / viewHeight;
        view.style.transform = `scale(${scale})`;
      } else {
        let w = window.innerWidth / viewWidth;
        let h = window.innerHeight / viewHeight;
        view.style.transform = `scale(${w},${h})`;
      }
    };
    onMounted(() => {
      document.body.style.overflow = "hidden";
      document.body.style.margin = "0";
      maxView.value.style.transition = "transform 0.5s";
      maxView.value.style["box-sizing"] = "border-box";
      zoomView();
      window.onresize = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          zoomView();
        }, 500);
      };
    }),
      onBeforeUnmount(() => {
        window.onresize = null;
      });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            ref_key: "maxView",
            ref: maxView,
            class: "yik-ui-max-view",
            style: normalizeStyle({
              width: __props.width,
              height: __props.height,
              transformOrigin: (__props.isCover ? "center" : "left") + " top",
            }),
          },
          [renderSlot(_ctx.$slots, "default")],
          4
        )
      );
    };
  },
};
class Sign {
  constructor({
    el,
    // canvas dom
    lineWidth = 3,
    // 线条宽度
    color = "#0088ff",
    //线条颜色
    bg,
    // 背景颜色或者背景图片
    watch: watch2,
  }) {
    this.canvas = el;
    this.ctx = this.canvas.getContext("2d");
    this._watch = watch2;
    this.isDraw = false;
    this.lineWidth = lineWidth;
    this.color = color;
    this.bg = bg;
    this._array = [];
    this.onInit();
    this.drawing();
    this.initBg();
  }
  // 回显
  setEchoArr(echoArr) {
    if (echoArr && Array.isArray(echoArr)) {
      this._array.push(...echoArr);
      echoArr.forEach((item) => {
        if (item.length)
          item.forEach((_item) => {
            if (_item instanceof Object) {
              this.ctx.lineTo(_item.x, _item.y);
              this.ctx.lineJoin = "round";
              this.ctx.lineCap = "round";
              this.ctx.lineWidth = this.lineWidth;
              this.ctx.strokeStyle = this.color;
              this.ctx.stroke();
            }
          });
      });
    } else {
      console.error("不是集合！");
    }
  }
  //保存
  save() {
    return this.canvas.toDataURL("image/png");
  }
  //清楚绘制
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.initBg();
  }
  //设置背景色
  initBg() {
    if (this.bg)
      if (this.bg.indexOf("http") != -1) {
        const img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = this.bg;
        img.onload = () => {
          this.ctx.drawImage(
            img,
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
        };
      } else {
        this.ctx.fillStyle = this.bg;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      }
  }
  //开始绘制
  drawing() {
    const offsetLeft = this.recurveOffset(this.canvas, "offsetLeft", 0);
    const offsetTop = this.recurveOffset(this.canvas, "offsetTop", 0);
    this.canvas.onmousemove = (e) => {
      if (this.isDraw) {
        const x = e.pageX - offsetLeft;
        const y = e.pageY - offsetTop;
        this._array[this._array.length - 1].push({
          x,
          y,
        });
        this.ctx.lineTo(x, y);
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
    };
    this.canvas.ontouchmove = (e) => {
      if (this.isDraw) {
        const x = e.touches[0].pageX - this.canvas.offsetLeft;
        const y = e.touches[0].pageY - this.canvas.offsetTop;
        this._array[this._array.length - 1].push({
          x,
          y,
        });
        this.ctx.lineTo(x, y);
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
    };
  }
  recurveOffset(dom, key, value) {
    if (dom[key]) {
      value += dom[key];
    }
    if (dom.offsetParent && dom.tagName != "BODY") {
      value = this.recurveOffset(dom.offsetParent, key, value);
    }
    return value;
  }
  // 初始化
  onInit() {
    this.canvas.ontouchstart = () => {
      this._array.push([]);
      this.isDraw = true;
      this.ctx.beginPath();
    };
    this.canvas.ontouchend = () => {
      this.isDraw = false;
      this.ctx.closePath();
      if (this._watch) this._watch(this._array);
    };
    this.canvas.onmousedown = () => {
      this._array.push([]);
      this.isDraw = true;
      this.ctx.beginPath();
    };
    window.onmouseup = () => {
      this.isDraw = false;
      this.ctx.closePath();
    };
    this.canvas.onmouseup = () => {
      this.isDraw = false;
      this.ctx.closePath();
      if (this._watch) this._watch(this._array);
    };
  }
}
const _hoisted_1 = ["width", "height"];
const _sfc_main$2 = {
  __name: "index",
  props: {
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 300,
    },
    color: {
      type: String,
      default: "#000",
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    bg: {
      default: "#fff",
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const yikSignRef = ref(null);
    let lineList = [];
    let sign = null;
    let stop = null;
    onMounted(() => {
      stop = watchEffect(() => {
        if (props.lineWidth && props.color && props.bg) {
          nextTick(() => {
            createSign();
          });
        }
      });
    });
    const createSign = () => {
      if (sign) {
        lineList = [];
        sign = null;
      }
      sign = new Sign({
        el: yikSignRef.value,
        color: props.color,
        lineWidth: props.lineWidth,
        bg: props.bg,
        watch: (data) => {
          lineList = [...data];
        },
      });
      if (props.value) {
        lineList = [...props.value];
        sign.setEchoArr(props.value);
      }
    };
    onUnmounted(() => {
      stop();
      if (sign) sign = null;
    });
    __expose({
      save: () => {
        return sign.save();
      },
      clear: () => {
        lineList = [];
        sign.clear();
      },
      getLine: () => {
        return lineList;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "canvas",
          {
            width: __props.width,
            height: __props.height,
            ref_key: "yikSignRef",
            ref: yikSignRef,
          },
          null,
          8,
          _hoisted_1
        )
      );
    };
  },
};
const _sfc_main$1 = {
  __name: "index",
  emits: ["onOpen", "onClose"],
  setup(__props, { emit }) {
    const showSlot = shallowRef(true);
    const slots = useSlots();
    const isPhone = () => {
      const mobileFlags = [
        /AppleWebKit.*Mobile.*/,
        // 移动终端
        /\(i[^;]+;( U;)? CPU.+Mac OS X/,
        // ios终端
        /Android/,
        // 安卓终端
        /iPhone/,
        // iPhone
        /iPad/,
        // iPad
      ];
      const ua = navigator.userAgent;
      for (let flag of mobileFlags) {
        if (flag.test(ua)) {
          return {
            phone: true,
            message: flag,
          };
        }
      }
      return {
        phone: false,
      };
    };
    const isSlotsHidden = (flag) => {
      if (slots.default) {
        showSlot.value = flag;
      }
    };
    const isKeyboard = () => {
      const innerHeight = window.innerHeight;
      if (isPhone().message == "/iPhone/") {
        window.addEventListener("focusin", () => {
          emit("onOpen");
          isSlotsHidden(false);
        });
        window.addEventListener("focusout", () => {
          emit("onClose");
          isSlotsHidden(true);
        });
      } else {
        window.addEventListener("resize", () => {
          const newInnerHeight = window.innerHeight;
          if (innerHeight > newInnerHeight) {
            emit("onOpen");
            isSlotsHidden(false);
          } else {
            emit("onClose");
            isSlotsHidden(true);
          }
        });
      }
    };
    onMounted(() => {
      isKeyboard();
    });
    return (_ctx, _cache) => {
      return showSlot.value
        ? renderSlot(_ctx.$slots, "default", { key: 0 })
        : createCommentVNode("", true);
    };
  },
};
const _sfc_main = {
  __name: "index",
  props: {
    speed: {
      type: Number,
      default: 1,
    },
    direction: {
      type: String,
      default: "Y",
    },
  },
  setup(__props) {
    const props = __props;
    const yikMarqueeRef = ref(null);
    const value = shallowRef(0);
    const isHovered = shallowRef(false);
    let boxHight = 0;
    let boxWidth = 0;
    onMounted(() => {
      nextTick(() => {
        const yikMarquee = yikMarqueeRef.value;
        yikMarqueeRef.value.style.overflow = "hidden";
        if (props.direction == "Y") {
          boxHight = yikMarquee.children[0].clientHeight;
          startY();
        }
        if (props.direction == "X") {
          yikMarquee.style.display = "flex";
          for (let index2 = 0; index2 < yikMarquee.children.length; index2++) {
            const element = yikMarquee.children[index2];
            element.style["white-space"] = "nowrap";
          }
          boxWidth = yikMarquee.children[0].scrollWidth;
          startX();
        }
      });
    });
    const startX = (_value) => {
      yikMarqueeRef.value.children[0].style.transform = `translateX(-${value.value}px)`;
      yikMarqueeRef.value.children[1].style.transform = `translateX(-${value.value}px)`;
      if (boxWidth <= _value) {
        value.value = 0;
      } else {
        value.value += props.speed;
      }
      if (!isHovered.value)
        window.requestAnimationFrame(() => {
          startX(value.value);
        });
    };
    const startY = (_value) => {
      yikMarqueeRef.value.children[0].style.transform = `translateY(-${value.value}px)`;
      yikMarqueeRef.value.children[1].style.transform = `translateY(-${value.value}px)`;
      if (boxHight <= _value) {
        value.value = 0;
      } else {
        value.value += props.speed;
      }
      if (!isHovered.value)
        window.requestAnimationFrame(() => {
          startY(value.value);
        });
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "yik-marquee",
            ref_key: "yikMarqueeRef",
            ref: yikMarqueeRef,
            onMouseenter:
              _cache[0] || (_cache[0] = ($event) => (isHovered.value = true)),
            onMouseleave:
              _cache[1] ||
              (_cache[1] = () => {
                isHovered.value = false;
                if (__props.direction == "Y") {
                  startY();
                }
                if (__props.direction == "X") {
                  startX();
                }
              }),
          },
          [
            renderSlot(_ctx.$slots, "default"),
            renderSlot(_ctx.$slots, "default"),
          ],
          544
        )
      );
    };
  },
};
const yikLog = (message, type) => {
  let backgroundColor = "";
  if (type == "error") {
    backgroundColor = "#ff362b";
  } else {
    backgroundColor = "#1c8eff";
  }
  console.log(
    "%c" + message,
    `padding:4px 15px;background-color: ${backgroundColor};color:#fff;border-radius: 10px;`
  );
};
let components = [
  {
    name: "YikScroll",
    component: _sfc_main$4,
  },
  {
    name: "YikMaxView",
    component: _sfc_main$3,
  },
  {
    name: "YikSign",
    component: _sfc_main$2,
  },
  {
    name: "YikIsKeyboard",
    component: _sfc_main$1,
  },
  {
    name: "YikMarquee",
    component: _sfc_main,
  },
];
let directives = [
  {
    name: "YikFocus",
    directive: YikFocus,
  },
  {
    name: "YikPower",
    directive: YikPower,
  },
  {
    name: "YikLazy",
    directive: YikLazy,
  },
];
const install = (app) => {
  try {
    components.forEach((item) => {
      app.component(item.name, item.component);
    });
    directives.forEach((item) => {
      app.directive(item.name, item.directive);
    });
    yikLog("YikUi 指令和组件，已全局注册.");
  } catch (e) {
    yikLog("YikUi 指令和组件，全局注册失败.", "error");
  }
};
const index = {
  install,
  YikScroll: _sfc_main$4,
  YikMaxView: _sfc_main$3,
  YikSign: _sfc_main$2,
  YikFocus,
  YikMarquee: _sfc_main,
  YikIsKeyboard: _sfc_main$1,
};
export { index as default };
