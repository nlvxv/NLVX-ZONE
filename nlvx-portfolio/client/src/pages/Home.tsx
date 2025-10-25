import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Menu, X, Github, Instagram, Mail, ExternalLink, Star, GitFork, Loader2, Twitter } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Memoized icon components to prevent SVG cloning issues during HMR
const IconGithub = () => <Github size={24} />;
const IconInstagram = () => <Instagram size={24} />;
const IconInstagram32 = () => <Instagram size={32} />;
const IconTwitter = () => <Twitter size={24} />;
const IconMail = () => <Mail size={24} />;
const IconMenu = () => <Menu size={24} />;
const IconClose = () => <X size={24} />;
const IconExternalLink = () => <ExternalLink size={16} />;
const IconStar = () => <Star size={16} />;
const IconFork = () => <GitFork size={16} />;
const IconLoader = () => <Loader2 size={18} className="animate-spin" />;
const IconGithub32 = () => <Github size={32} />;

export default function Home() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContactMutation = trpc.contact.submit.useMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch GitHub projects
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/nlvxv/repos?sort=stars&per_page=6");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMutation.mutateAsync(formData);
      toast.success("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 animate-fade-in-left">
            <span className="text-xl font-bold text-gradient">{APP_TITLE}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-accent transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-b border-border animate-slide-in-down">
            <div className="container py-4 flex flex-col gap-4">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left py-2 hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Legendary Developer</span>
              <br />
              <span className="text-foreground">Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technology, smooth animations, and innovative solutions. Welcome to the portfolio of NLVX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-lg"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="px-8 py-6 text-lg rounded-lg"
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <a href="https://github.com/nlvxv" target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-card rounded-full transition-colors">
                <IconGithub />
              </a>
              <a href="https://x.com/nlvxv" target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-card rounded-full transition-colors">
                <IconTwitter />
              </a>
              <a href="https://instagram.com/nlvx.exe" target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-card rounded-full transition-colors">
                <IconInstagram />
              </a>
              <a href="mailto:nlvxdev@gmail.com" className="p-3 hover:bg-card rounded-full transition-colors">
                <IconMail />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with expertise in creating beautiful, performant web applications. With years of experience in modern web technologies, I transform ideas into reality.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My focus is on building scalable solutions that not only look stunning but also deliver exceptional user experiences. I believe in clean code, attention to detail, and continuous learning.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
              <div className="animate-fade-in-right">
                <div className="glass p-8 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span className="text-lg font-medium">Full-Stack Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span className="text-lg font-medium">UI/UX Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span className="text-lg font-medium">Performance Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span className="text-lg font-medium">API Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"] },
              { title: "Backend", skills: ["Node.js", "Express", "tRPC", "REST APIs", "GraphQL"] },
              { title: "Tools & Platforms", skills: ["Git", "GitHub", "Vercel", "Docker", "AWS"] },
            ].map((category, idx) => (
              <div
                key={category.title}
                className="glass p-8 rounded-xl animate-fade-in-up hover-lift"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-6 text-accent">{category.title}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-card/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          {loadingProjects ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="glass p-6 rounded-xl hover-lift group animate-fade-in-up transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors flex-1 break-words">{project.name}</h3>
                    <Github size={20} className="text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">{project.description || "A GitHub repository project"}</p>
                  <div className="text-xs text-muted-foreground mb-4 opacity-75">
                    {project.updated_at && new Date(project.updated_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <IconStar />
                        {project.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconFork />
                        {project.forks_count}
                      </div>
                    </div>
                    {project.language && (
                      <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">{project.language}</span>
                    )}
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    View on GitHub <IconExternalLink />
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://github.com/nlvxv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              View All Projects <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="glass p-8 rounded-xl animate-fade-in-up">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none disabled:opacity-50"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && <IconLoader />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <a
              href="https://github.com/nlvxv"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-xl text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <IconGithub32 />
              </div>
              <p className="font-medium">GitHub</p>
              <p className="text-sm text-muted-foreground">@nlvxv</p>
            </a>
            <a
              href="mailto:nlvxdev@gmail.com"
              className="glass p-6 rounded-xl text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <Mail size={32} />
              </div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">nlvxdev@gmail.com</p>
            </a>
            <a
              href="https://instagram.com/nlvx.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-xl text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <IconInstagram32 />
              </div>
              <p className="font-medium">Instagram</p>
              <p className="text-sm text-muted-foreground">@nlvx.exe</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container text-center text-muted-foreground">
          <p>© 2025 NLVX. All rights reserved. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
