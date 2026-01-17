    let scene,
      camera,
      renderer,
      city = [],
      isDaytime = true,
      isRaining = false;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
  );
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("cityCanvas"),
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
        // Add ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x1a5f1a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Add directional light (sun/moon)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        camera.position.set(0, 15, 30);
        camera.lookAt(scene.position);

        // Initialize rain
        initRain();

        animate();
      }

      function createBuilding(type) {
        let geometry, material;
        switch (type) {
          case "house":
            geometry = new THREE.BoxGeometry(2, 3, 2);
            material = new THREE.MeshPhongMaterial({ color: 0xa52a2a });
            break;
          case "office":
            geometry = new THREE.BoxGeometry(3, 10, 3);
            material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
            break;
          case "park":
            geometry = new THREE.CylinderGeometry(2, 2, 1, 32);
            material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            break;
        }
        const building = new THREE.Mesh(geometry, material);
        const x = Math.random() * 80 - 40;
        const z = Math.random() * 80 - 40;
        building.position.set(x, geometry.parameters.height / 2, z);
        scene.add(building);
        city.push({ type, building });
        updateStats();
      }

      function updateStats() {
        const population = city.reduce(
          (acc, b) =>
            acc + (b.type === "house" ? 4 : b.type === "office" ? 20 : 0),
          0
        );
        const happiness = Math.max(
          0,
          Math.min(
            100,
            100 -
              city.length +
              city.filter((b) => b.type === "park").length * 10
          )
        );
        const income = city.reduce(
          (acc, b) =>
            acc + (b.type === "house" ? 100 : b.type === "office" ? 1000 : -50),
          0
        );

        document.getElementById("population").textContent = population;
        document.getElementById("happiness").textContent = happiness + "%";
        document.getElementById("income").textContent = income;
      }

      function toggleDayNight() {
        isDaytime = !isDaytime;
        if (isDaytime) {
          scene.background = new THREE.Color(0x87ceeb);
          scene.fog = new THREE.Fog(0x87ceeb, 0.015, 100);
        } else {
          scene.background = new THREE.Color(0x000033);
          scene.fog = new THREE.Fog(0x000033, 0.015, 100);
        }
      }

      function initRain() {
        const rainGeometry = new THREE.BufferGeometry();
        const rainCount = 15000;
        const positions = new Float32Array(rainCount * 3);
        for (let i = 0; i < rainCount * 3; i += 3) {
          positions[i] = Math.random() * 400 - 200;
          positions[i + 1] = Math.random() * 500 - 250;
          positions[i + 2] = Math.random() * 400 - 200;
        }
        rainGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        const rainMaterial = new THREE.PointsMaterial({
          color: 0xaaaaaa,
          size: 0.1,
          transparent: true,
        });
        rain = new THREE.Points(rainGeometry, rainMaterial);
        scene.add(rain);
      }

      function animateRain() {
        const positions = rain.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.1 + Math.random() * 0.1;
          if (positions[i] < -200) {
            positions[i] = 200;
          }
        }
        rain.geometry.attributes.position.needsUpdate = true;
      }

      function animate() {
        requestAnimationFrame(animate);
        if (isRaining) animateRain();
        renderer.render(scene, camera);
      }

      init();

      // Event Listeners
      document.querySelectorAll(".buildBtn").forEach((btn) => {
        btn.addEventListener("click", () =>
          createBuilding(btn.dataset.building)
        );
      });

      document
        .getElementById("toggleDayNight")
        .addEventListener("click", toggleDayNight);
      document.getElementById("toggleRain").addEventListener("click", () => {
        isRaining = !isRaining;
        rain.visible = isRaining;
      });

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    