<template>
    <div>
         <canvas ref="canvasa" width="300" height="300"></canvas>
    </div>
</template>
<script>
class Wave {
        constructor({
            canvasWidth, // 轴长
            canvasHeight, // 轴高
            waveWidth = 0.055, // 波浪宽度,数越小越宽
            waveHeight = 2, // 波浪高度,数越大越高
            xOffset = 0,
            speed = 0.04,
            colors = ['#DBB77A', '#BF8F3B'], // 波浪颜色
        } = {}) {
            this.points = [];
            this.startX = 0;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.waveWidth = waveWidth;
            this.waveHeight = waveHeight;
            this.xOffset = xOffset;
            this.speed = speed;
            this.colors = colors;
        }
        getChartColor(ctx) {
            const radius = this.canvasWidth / 2;
            const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
            grd.addColorStop(0, this.colors[0]);
            grd.addColorStop(1, this.colors[1]);
            return grd;
        }
        draw(ctx) {
            ctx.save();
            const points = this.points;
            ctx.beginPath();
            for (let i = 0; i < points.length; i += 1) {
                const point = points[i];
                ctx.lineTo(point[0], point[1]);
            }
            ctx.lineTo(this.canvasWidth, this.canvasHeight);
            ctx.lineTo(this.startX, this.canvasHeight);
            ctx.lineTo(points[0][0], points[0][1]);
            ctx.fillStyle = this.getChartColor(ctx);
            ctx.fill();
            ctx.restore();
        }
        update({
            nowRange,
        } = {}) {
            this.points = [];
            const {
                startX,
                waveHeight,
                waveWidth,
                canvasWidth,
                canvasHeight,
                xOffset,
            } = this;
            for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
                const y = Math.sin(((startX + x) * waveWidth) + xOffset);
                const dY = canvasHeight * (1 - (nowRange / 100));
                this.points.push([x, dY + (y * waveHeight)]);
            }
            this.xOffset += this.speed;
        }
    }
export default {
	data(){
		return {
			fcanvas:''
		}
	},
     mounted() {
            const canvas = this.$refs.canvasa;
            canvas.height = canvas.height;
            canvas.width = canvas.width;
            this.fcanvas = canvas;
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
            this.radius = this.canvasWidth / 2;
            // 高清适配
            // Retina.run(canvas);
            this.nowRange = 0;
            this.rangeValue = 90;
            this.wave1 = new Wave({
                canvasWidth: this.canvasWidth, // 轴长
                canvasHeight: this.canvasHeight, // 轴高
                waveWidth: 0.055, // 波浪宽度,数越小越宽
                waveHeight: 4, // 波浪高度,数越大越高
                colors: ['#F39C6B', '#A0563B'], // 波浪颜色
                xOffset: 0, // 初始偏移
                speed: 0.04, // 速度
            });
            this.wave2 = new Wave({
                canvasWidth: this.canvasWidth, // 轴长
                canvasHeight: this.canvasHeight, // 轴高
                waveWidth: 0.04, // 波浪宽度,数越小越宽
                waveHeight: 3, // 波浪高度,数越大越高
                colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'], // 波浪颜色
                xOffset: 2, // 初始偏移
                speed: 0.02, // 速度
            });
            this.drawa();
        },
        methods: {
            drawa() {
				console.log(this.fcanvas)
                const ctx = this.fcanvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                if (!this.isDrawContainer) {
                    this.drawContainer(ctx);
                }
                // this.drawBackground(ctx);
                if (this.nowRange <= this.rangeValue) {
                    this.nowRange += 1;
                }
                if (this.nowRange > this.rangeValue) {
                    this.nowRange -= 1;
                }
                this.wave2.update({
                    nowRange: this.nowRange,
                });
                this.wave2.draw(ctx);
                this.wave1.update({
                    nowRange: this.nowRange,
                });
                this.wave1.draw(ctx);
                window.requestAnimationFrame(this.draw);
            },

            drawContainer(ctx) {
                const type = 'circle';
                if (type === 'circle') {
                    this.drawCircle(ctx);
                } else if (type === 'star') {
                    this.drawStar(ctx);
                } else if (type === 'roundRect') {
                    this.drawRoundRect(ctx);
                } else if (type === 'heart') {
                    this.drawHeart(ctx);
                }
            },

            drawBackground(ctx) {
                const r = this.radius;
                const cR = r;
                ctx.beginPath();
                ctx.arc(r, r, cR, 0, 2 * Math.PI);
                const grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
                grd.addColorStop(0, 'rgba(127, 57, 242, 0');
                grd.addColorStop(1, 'rgba(255, 195, 103, 0.11)');
                ctx.fillStyle = grd;
                ctx.fill();
            },

            drawCircle(ctx) {
                const r = this.canvasWidth / 2;
                const lineWidth = 4;
                const cR = r - (lineWidth);
                ctx.lineWidth = lineWidth;
                ctx.beginPath();
                ctx.arc(r, r, cR, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
                ctx.stroke();
                ctx.clip();
                this.isDrawContainer = true;
            }

        }
}
</script>