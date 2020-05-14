import { Point, Vector, Path, Svg } from './svg'

describe('svg', () => {
  describe('Point', () => {
    it('add', () => {
      const po = new Point(1.0, 1.0).add(new Point(2.0, 2.0))
      expect(po.x).toBe(3.0)
      expect(po.y).toBe(3.0)
    })

    it('sub', () => {
      const po = new Point(3.0, 3.0).sub(new Point(1.0, 1.0))
      expect(po.x).toBe(2.0)
      expect(po.y).toBe(2.0)
    })

    it('sub', () => {
      const po = new Point(1.0, 1.0).scale(3)
      expect(po.x).toBe(3.0)
      expect(po.y).toBe(3.0)
    })

    it('toVector', () => {
      const vec = new Point(1.0, 1.0).toVector()
      expect(vec.value).toBe(1.4142135623730951)
      expect(vec.angle).toBe(0.7853981633974483)
    })
  })
  describe('Vector', () => {
    it('toPoint', () => {
      const po = new Vector(1.4142135, 0.7853982).toPoint()
      expect(po.x).toBe(1.0)
      expect(po.y).toBe(1.0)
    })
    it('scale', () => {
      const vec = new Vector(1.0, 0.5).scale(0.3)
      expect(vec.value).toBe(0.3)
      expect(vec.angle).toBe(0.5)
    })
  })
  describe('Path', () => {
    it('addPoint', () => {
      const path = new Path().addPoint(new Point(1, 1))
      expect(path.points.length).toBe(1)
      expect(path.points[0].x).toBe(1)
      expect(path.points[0].y).toBe(1)
    })
    it('scale', () => {
      const path = new Path({ strokeWidth: 1 })
        .addPoint(new Point(1, 1))
        .scale(2)
      expect(path.strokeWidth).toBe(2)
      expect(path.points[0].x).toBe(2)
      expect(path.points[0].y).toBe(2)
    })
    it('getCommandString Line', () => {
      const path = new Path({ circuler: false, close: false })
      path
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(-1, -1))
        .formatCommand()
      expect(path.getCommandString()).toBe('M 0 0 L 1 1 L -1 -1')
    })
    it('getCommandString Line Close', () => {
      const path = new Path({ circuler: false, close: true })
      path
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(-1, -1))
        .formatCommand()
      expect(path.getCommandString()).toBe('M 0 0 L 1 1 L -1 -1 L 0 0 Z')
    })
    it('getCommandString Circuler', () => {
      const path = new Path({ circuler: true, close: false })
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(2, 1))
        .addPoint(new Point(3, 0))
        .formatCommand()
      expect(path.getCommandString()).toBe(
        'M 0 0 C 0.2 0.2 0.6 0.8 1 1 C 1.4 1.2 1.6 1.2 2 1 C 2.4 0.8 2.8 0.2 3 0'
      )
    })
    it('getCommandString Circuler Close', () => {
      const path = new Path({ circuler: true, close: true })
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(2, 1))
        .addPoint(new Point(3, 0))
        .formatCommand()
      expect(path.getCommandString()).toBe(
        'M 0 0 C 0.2 0.2 0.6 0.8 1 1 C 1.4 1.2 1.6 1.2 2 1 C 2.4 0.8 2.8 0.2 3 0 C 2.6 -0.2 0.4 -0.2 0 0 Z'
      )
    })
    it('toElement', () => {
      const path = new Path({ circuler: true, close: false })
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(2, 1))
        .addPoint(new Point(3, 0))
        .formatCommand()
      expect(path.toElement()).toMatchSnapshot()
    })
  })
  describe('Renderer', () => {
    let svg: Svg
    beforeEach(() => {
      const path = new Path({ circuler: true, close: false })
        .addPoint(new Point(0, 0))
        .addPoint(new Point(1, 1))
        .addPoint(new Point(2, 1))
        .addPoint(new Point(3, 0))
        .formatCommand()
      svg = new Svg({ width: 500, height: 500 }).addPath(path)
    })
    // TODO: Fix width, height
    it('toElement', () => {
      expect(svg.toElement()).toMatchSnapshot()
    })
    // TODO: replace image snapshot
    it('toBase64', () => {
      expect(svg.toBase64()).toMatchSnapshot()
    })
    it('download svg', done => {
      const testDownload = (param: any): void => {
        expect(param).toMatchSnapshot()
        done()
      }
      svg.download('svg', testDownload)
    })
    // TODO: Fix download test
    // it('download jpg', done => {
    //   const testDownload = (param: any): void => {
    //     expect(param).toMatchSnapshot()
    //     done()
    //   }
    //   renderer.download('jpg', testDownload)
    // }, 30000)
    // it('download png', done => {
    //   const testDownload = (param: any): void => {
    //     expect(param).toMatchSnapshot()
    //     done()
    //   }
    //   renderer.download('png', testDownload)
    // }, 30000)
  })
})
