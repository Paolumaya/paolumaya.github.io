module Jekyll
  class HelloWorldGenerator < Generator
    safe true
    priority :highest

    def generate(site)
      puts "✅ Hello from your Jekyll plugin!"
    end
  end
end